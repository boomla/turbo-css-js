import Signature from "./Signature";
import Call from "./Call";
import Type from "./Type";
import Value from "./Value";
import Block from "../css/Block";
import Order from "../css/Order";
import Declaration from "../css/Declaration";

import registerBackgroundUtils from "./Utils.BACKGROUND";
import registerBorderUtils from "./Utils.BORDER";
import registerBoxAlignmentUtils from "./Utils.BOX_ALIGNMENT";
import registerCoordinateUtils from "./Utils.COORDINATES";
import registerEffectUtils from "./Utils.EFFECTS";
import registerFlexBoxUtils from "./Utils.FLEXBOX";
import registerInteractivityUtils from "./Utils.INTERACTIVITY";
import registerLayoutUtils from "./Utils.LAYOUT";
import registerOutlineUtils from "./Utils.OUTLINE";
import registerSizingUtils from "./Utils.SIZING";
import registerSpacingUtils from "./Utils.SPACING";
import registerSvgUtils from "./Utils.SVG";
import registerTableUtils from "./Utils.TABLE";
import registerTextUtils from "./Utils.TEXT";
import registerTransformUtils from "./Utils.TRANSFORM";
import registerTransitionUtils from "./Utils.TRANSITION";


export interface Utility {
	signature: Signature;
	fn: (call: Call) => Block;
	order: Order;
}

export default class Utilities {
	utilities: { [key: string]: Array<Utility> } = {};

	constructor() {
		// NOP
	}

	registerBaseUtilities() {
		// 
		// WARNING: THE ORDER OF REGISTERING THESE UTILITIES MATTERS.
		//          DO NOT SORT THIS LIST FOR AESTHETICS.
		// 

		registerLayoutUtils(this);
		registerFlexBoxUtils(this);
		registerCoordinateUtils(this);
		registerBoxAlignmentUtils(this);
		registerTableUtils(this);
		registerSizingUtils(this);
		registerSpacingUtils(this);
		registerBorderUtils(this);
		registerOutlineUtils(this);
		registerTransformUtils(this);
		registerTextUtils(this);
		registerBackgroundUtils(this);
		registerEffectUtils(this);
		registerInteractivityUtils(this);
		registerSvgUtils(this);
		registerTransitionUtils(this);
	}

	registerUtil(name: string, signature: Signature, fn: (call: Call) => Block) {
		let utilsByThisName = this.utilities[name];
		if (utilsByThisName !== undefined) {
			let util = {
				signature: signature,
				fn: fn,
				order: utilsByThisName[0].order,
			};
			this.utilities[name].push(util);
		}
		else {
			let util = {
				signature: signature,
				fn: fn,
				order: new Order(Object.keys(this.utilities).length + 1),
			};
			this.utilities[name] = [ util ];
		}
	}

	registerKeyword(name: string, ...declarations: Array<Declaration>) {
		this.registerUtil(name,
			new Signature(),
			function(_call: Call): Block {
				return new Block(declarations);
			},
		);
	}

	
	fn1(name: string, typ: Type, fn: (value: Value) => Block) {
		this.registerUtil(name,
			new Signature(typ),
			function(call: Call): Block {
				return fn(call.args[0]);
			},
		);
	}

	fn2(name: string, typ1: Type, typ2: Type, fn: (value1: Value, value2: Value) => Block) {
		this.registerUtil(name,
			new Signature(
				typ1,
				typ2,
			),
			function(call: Call): Block {
				return fn(call.args[0], call.args[1]);
			},
		);
	}

	fn3(name: string, typ1: Type, typ2: Type, typ3: Type, fn: (value1: Value, value2: Value, value3: Value) => Block) {
		this.registerUtil(name,
			new Signature(
				typ1,
				typ2,
				typ3,
			),
			function(call: Call): Block {
				return fn(call.args[0], call.args[1], call.args[2]);
			},
		);
	}
}





