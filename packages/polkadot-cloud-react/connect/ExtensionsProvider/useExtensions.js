import { useContext } from "react";
import { ExtensionsContext } from ".";
export var useExtensions = function () { return useContext(ExtensionsContext); };
