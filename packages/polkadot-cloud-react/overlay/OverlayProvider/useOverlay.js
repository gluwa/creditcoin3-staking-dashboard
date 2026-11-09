import { useContext } from "react";
import { OverlayContext } from ".";
export var useOverlay = function () { return useContext(OverlayContext); };
