import { unimplemented } from "@polkadot-cloud/utils";
export var defaultModalConfig = {
    key: "",
    size: "lg",
    options: {},
};
export var defaultCanvasConfig = {
    key: "",
    options: {},
    scroll: true,
};
export var defaultOverlayContext = {
    openOverlayInstances: 0,
    activeOverlayInstance: null,
    setOpenOverlayInstances: function (direction, instanceType) { return unimplemented; },
    setActiveOverlayInstance: function (instance) { return unimplemented; },
    canvas: {
        status: "closed",
        config: defaultCanvasConfig,
        openCanvas: function (config) { return unimplemented; },
        closeCanvas: function () { return unimplemented; },
        setCanvasStatus: function (s) { return unimplemented; },
    },
    modal: {
        status: "closed",
        config: defaultModalConfig,
        modalHeight: 0,
        modalMaxHeight: 0,
        modalResizeCounter: 0,
        openModal: function (config) { return unimplemented; },
        replaceModal: function (config) { return unimplemented; },
        setModalHeight: function (height) { return unimplemented; },
        setModalResize: function () { return unimplemented; },
        setModalStatus: function (status) { return unimplemented; },
        setModalRef: function (modalRef) { return unimplemented; },
        setModalHeightRef: function (heightRef) { return unimplemented; },
    },
};


