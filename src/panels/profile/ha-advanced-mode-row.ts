import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import "../../components/ha-card";
import "../../components/ha-settings-row";
import "../../components/ha-switch";
import {
  CoreFrontendUserData,
  getOptimisticFrontendUserDataCollection,
} from "../../data/frontend";
import { HomeAssistant } from "../../types";

@customElement("ha-advanced-mode-row")
class AdvancedModeRow extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public narrow = false;

  @property({ attribute: false }) public coreUserData?: CoreFrontendUserData;

  protected render(): TemplateResult {
    return html`
      <ha-settings-row .narrow=${this.narrow}>
        <span slot="heading">
          ${this.hass.localize("ui.panel.profile.advanced_mode.title")}
        </span>
        <span slot="description">
          ${this.hass.localize("ui.panel.profile.advanced_mode.description")}
        </span>
        <ha-switch
          .checked=${this.coreUserData && this.coreUserData.showAdvanced}
          .disabled=${this.coreUserData === undefined}
          @change=${this._advancedToggled}
        ></ha-switch>
      </ha-settings-row>
    `;
  }

  private async _advancedToggled(ev) {
    getOptimisticFrontendUserDataCollection(this.hass.connection, "core").save({
      ...this.coreUserData,
      showAdvanced: ev.currentTarget.checked,
    });
  }

  static get styles(): CSSResultGroup {
    return css`
      a {
        color: var(--primary-color);
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-advanced-mode-row": AdvancedModeRow;
  }
}
