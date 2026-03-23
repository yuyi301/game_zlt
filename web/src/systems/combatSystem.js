import { skills } from "../content/gameContent.js";

export class CombatSystem {
  constructor({ store, eventBus }) {
    this.store = store;
    this.eventBus = eventBus;
  }

  listActions() {
    const state = this.store.getState();
    return skills.map((skill) => ({
      ...skill,
      disabled: state.player.energy < skill.energyCost || state.finished,
    }));
  }

  useSkill(skillId) {
    const state = this.store.getState();
    const skill = skills.find((s) => s.id === skillId);
    if (!skill || state.player.energy < skill.energyCost || state.finished) return;

    const enemyHp = Math.max(0, state.enemy.hp - skill.damage);
    const energy = state.player.energy - skill.energyCost;
    const logs = [`小羽施放 ${skill.name}，造成 ${skill.damage} 点伤害。`, ...state.logs];

    let finished = state.finished;
    let winner = state.winner;
    let playerHp = state.player.hp;

    if (enemyHp <= 0) {
      finished = true;
      winner = "player";
      logs.unshift("战斗结束：小羽胜利，失序节点净化完成。");
    } else {
      playerHp = Math.max(0, playerHp - state.enemy.damage);
      logs.unshift(`${state.enemy.name}反击，造成 ${state.enemy.damage} 点伤害。`);
      if (playerHp <= 0) {
        finished = true;
        winner = "enemy";
        logs.unshift("战斗结束：小羽倒下，协议重构失败。");
      }
    }

    this.store.patch({
      player: { ...state.player, hp: playerHp, energy },
      enemy: { ...state.enemy, hp: enemyHp },
      logs,
      finished,
      winner,
    });

    this.eventBus.emit("combat:updated", this.store.getState());
  }

  recoverEnergy() {
    const state = this.store.getState();
    if (state.finished) return;

    const nextEnergy = Math.min(3, state.player.energy + 1);
    const logs = [`小羽进行态势校准，恢复 1 点能量。`, ...state.logs];

    this.store.patch({ player: { ...state.player, energy: nextEnergy }, logs });
    this.eventBus.emit("combat:updated", this.store.getState());
  }
}
