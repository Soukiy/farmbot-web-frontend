import * as React from "react";
import { RegimensState } from "../interfaces";
import { SaveButton } from "./save_button";
import { DeleteButton } from "./delete_button";
import { StartButton, StopButton } from "./regimen_tasks";
import { CopyButton } from "./copy_button";
import { EmptyEditor } from "./empty_editor";
import { ActiveEditor } from "./active_editor";
import { AuthState } from "../../auth/interfaces";
import { BotState } from "../../devices/interfaces";
import { t } from "i18next";

interface RegimenEditorWidgetProps {
  regimens: RegimensState;
  dispatch: Function;
  auth: AuthState;
  bot: BotState;
}
export function RegimenEditorWidget({regimens, dispatch, auth, bot}: RegimenEditorWidgetProps) {
  let regimen = regimens.all[regimens.current];
  let DynamicComponent = regimen ? ActiveEditor : EmptyEditor;
  let saveButtenProps = {
    dispatch,
    regimen,
    token: auth.token,
    baseUrl: auth.iss
  };
  let taskProps = {
    dispatch,
    regimen,
    bot
  };
  return (<div>
    <div className="widget-wrapper regimen-editor-widget">
      <div className="row">
        <div className="col-sm-12">
          <SaveButton regimen={regimen}
            dispatch={dispatch}
            url={auth.iss} />
          <CopyButton regimen={regimen} dispatch={dispatch} />
          <DeleteButton {...saveButtenProps} />
          <StartButton  {...taskProps} />
          <StopButton  {...taskProps} />
          <div className="widget-header">
            <h5> Regimen Editor </h5>
            <i className="fa fa-question-circle widget-help-icon">
              <div className="widget-help-text">{t(`Regimens allow FarmBot
                to take care of a plant throughout its entire life. A
                regimen consists of many sequences that are scheduled to run
                based on the age of the plant. Regimens are applied to
                plants from the farm designer and can be re-used on many
                plants growing at the same or different times. Multiple
                regimens can be applied to any one plant. Coming soon: Regimens!`)}</div>
            </i>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="widget-content">
            <DynamicComponent regimen={regimen} dispatch={dispatch} />
          </div>
        </div>
      </div>
    </div>
  </div>);

}
