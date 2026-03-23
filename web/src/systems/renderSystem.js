export class RenderSystem {
  constructor({ store, combatSystem }) {
    this.store = store;
    this.combatSystem = combatSystem;
    this.canvas = document.getElementById("stage");
    this.ctx = this.canvas.getContext("2d");

    this.statusEl = document.getElementById("status");
    this.actionsEl = document.getElementById("actions");
    this.logsEl = document.getElementById("logs");

    this.store.subscribe((state) => this.render(state));
  }

  render(state) {
    if (!this.ctx || !this.statusEl || !this.actionsEl || !this.logsEl) return;
    this.renderStage(state);
    this.renderStatus(state);
    this.renderActions(state);
    this.renderLogs(state);
  }

  renderStage(state) {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = "#6ad7ff";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText(state.player.portrait, 24, 44);
    ctx.fillText(`小羽 HP ${state.player.hp}/${state.player.maxHp}`, 56, 44);

    ctx.fillStyle = "#ff8d8d";
    ctx.fillText(state.enemy.sprite, 24, 96);
    ctx.fillText(`${state.enemy.name} HP ${state.enemy.hp}/${state.enemy.maxHp}`, 56, 96);

    ctx.fillStyle = "#dce5ff";
    ctx.font = "18px sans-serif";
    ctx.fillText(`章节：${state.chapter.backdrop || "🌌"} ${state.chapter.name}`, 24, 154);

    if (state.finished) {
      ctx.fillStyle = state.winner === "player" ? "#8cffb7" : "#ff7f7f";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText(state.winner === "player" ? "任务完成" : "任务失败", 270, 230);
    }
  }

  renderStatus(state) {
    this.statusEl.innerHTML = `
      <p>章节：${state.chapter.name}</p>
      <p>能量：${state.player.energy}/3</p>
      <p class="${state.finished && state.winner === "enemy" ? "warn" : ""}">战斗状态：${state.finished ? "已结束" : "进行中"}</p>
    `;
  }

  renderActions(state) {
    const actions = this.combatSystem.listActions();
    const buttons = actions
      .map(
        (action) =>
          `<button data-skill-id="${action.id}" ${action.disabled ? "disabled" : ""}>${action.name}（-${action.energyCost}能量）</button>`,
      )
      .join("");

    this.actionsEl.innerHTML = `${buttons}<button data-command="recover" ${state.finished ? "disabled" : ""}>态势校准（+1能量）</button>`;
  }

  renderLogs(state) {
    this.logsEl.innerHTML = state.logs.slice(0, 12).map((log) => `<li>${log}</li>`).join("");
  }
}
