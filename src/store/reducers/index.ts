import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth.reducer";
import chatSetup from "./chat-setup.reducer";
import chat from "./chat.reducer";
import ui from "./ui.reducer";

export const RootStateReducers = { ui, chat, auth, chatSetup };
export default combineReducers(RootStateReducers);
