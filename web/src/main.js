import { EventBus } from "./core/eventBus.js";
import { Store } from "./core/store.js";
import { CombatSystem } from "./systems/combatSystem.js";
import { RenderSystem } from "./systems/renderSystem.js";
import { chapters, enemyPool, playerTemplate } from "./content/gameContent.js";
import { companyAgents } from "./agents/companyAgents.js";

function pickEnemy() {
  const index = Math.floor(Math.random() * enemyPool.length);
  return { ...enemyPool[index] };
}

const initialState = {
  chapter: chapters[0],
  player: { ...playerTemplate },
  enemy: pickEnemy(),
  logs: [
    `CEO系统播报：子Agent协同已上线（${companyAgents.map((x) => x.owner).join(" / ")}）。`,
    `战斗开始：${playerTemplate.name} 进入 ${chapters[0].name}。`,
  ],
  finished: false,
  winner: null,
};

const eventBus = new EventBus();
const store = new Store(initialState);
const combatSystem = new CombatSystem({ store, eventBus });
new RenderSystem({ store, combatSystem });

function wireActions() {
  const actionsEl = document.getElementById("actions");
  actionsEl.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;

    const skillId = target.dataset.skillId;
    if (skillId) {
      combatSystem.useSkill(skillId);
      return;
    }

    if (target.dataset.command === "recover") {
      combatSystem.recoverEnergy();
    }
  });
}

wireActions();
store.patch({ ...initialState });
