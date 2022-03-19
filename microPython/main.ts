

//% color="#ff9f06" iconWidth=50 iconHeight=40
namespace Sentry {
    //% block="Sentry init port [MODE] addr [ADDR]" blockType="command"
    //% MODE.shadow="dropdown" MODE.options="MODE"
    //% ADDR.shadow="dropdown" ADDR.options="SENTRY"
    export function Begin(parameter: any) {
        let mode = parameter.MODE.code;
        let addr = parameter.ADDR.code;

        if (Generator.board === 'esp32') {
            Generator.addImport("from mpython import *");
        }
        else if (Generator.board === 'microbit') {
            Generator.addImport("from microbit import *");
        }

        Generator.addImport("from Sentry import *");
        Generator.addDeclaration(`sentryObject`, `sentry = Sentry2(${addr})`, true);
        Generator.addCode(`sentry.begin(${mode})`);
    }

    //% block="Sentry [VISION_STA] vision [VISION_TYPE]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% VISION_STA.shadow="dropdown" VISION_STA.options="VISION_STA"    
    export function VisionSet(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let vision_sta = parameter.VISION_STA.code;

        if (vision_sta == "ON") {
            Generator.addCode(`sentry.VisionBegin(${vision_type})`);
        } else {
            Generator.addCode(`sentry.VisionEnd(${vision_type})`);
        }
    }

    //% block="Sentry set [VISION_TYPE] Param [NUM]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% NUM.shadow="range"   NUM.params.min=0    NUM.params.max=25    NUM.defl=1
    export function SetParamNum(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        Generator.addCode(`sentry.SetParamNum(${vision_type},${num})`);
    }

    //% block="Sentry set color parameter [NUM] ROI area center point abscissa [XVALUE] ordinate [YVALUE] width [WIDTH] height [HIGHT]"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="range"   NUM.params.min=0    NUM.params.max=25    NUM.defl=0
    //% XVALUE.shadow="number"   XVALUE.defl=160
    //% YVALUE.shadow="number"   YVALUE.defl=120
    //% WIDTH.shadow="number"   WIDTH.defl=8
    //% HIGHT.shadow="number"   HIGHT.defl=8
    export function SetColorParam(parameter: any) {

        let num = parameter.NUM.code;
        let x = parameter.XVALUE.code;
        let y = parameter.YVALUE.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;

        Generator.addCode(`sentry.SetParam(sentry_vision_e.kVisionColor,[${x}, ${y}, ${w}, ${h}, 0],${num})`);
    }

    //% block="Sentry set color block detection parameter [NUM] minimum width [WIDTH] minimum height [HIGHT] to detect color [COLOR_LABLE]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="range"   NUM.params.min=0    NUM.params.max=25    NUM.defl=0
    //% WIDTH.shadow="number"   WIDTH.defl=8
    //% HIGHT.shadow="number"   HIGHT.defl=8
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"
    export function SetBlobParam(parameter: any) {

        let num = parameter.NUM.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;
        let l = parameter.COLOR_LABLE.code;

        Generator.addCode(`sentry.SetParam(sentry_vision_e.kVisionBlob,[0, 0, ${w}, ${h}, ${l}],${num})`);
    }

    //% block="Sentry set default" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    export function SensorSetDefault(parameter: any) {

        Generator.addCode(`sentry.SensorSetDefault()`);
    }

    //% block="Sentry set coordinate type [COORDINATE]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% COORDINATE.shadow="dropdown" COORDINATE.options="COORDINATE"
    export function SeneorSetCoordinateType(parameter: any) {

        let coordinate = parameter.COORDINATE.code;

        Generator.addCode(`sentry.SeneorSetCoordinateType(${coordinate})`);
    }

    //% block="Sentry set the LED algorithm to detect a color of [LED_COLOR1] and not to detect a color of [LED_COLOR2]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% LED_COLOR1.shadow="dropdown" LED_COLOR1.options="LED_COLOR"
    //% LED_COLOR2.shadow="dropdown" LED_COLOR2.options="LED_COLOR"     
    export function LedSetColor(parameter: any) {

        let color1 = parameter.LED_COLOR1.code;
        let color2 = parameter.LED_COLOR2.code;

        Generator.addCode(`sentry.LedSetColor(${color1},${color2}, 1)`);
    }

    //% block="Sentry set camera [ZOOM]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% ZOOM.shadow="dropdown" ZOOM.options="ZOOM" 
    export function CameraSetZoom(parameter: any) {

        let zoom = parameter.ZOOM.code;
        Generator.addCode(`sentry.CameraSetZoom(${zoom})`);
    }

    // //% block="Sentry set camera [ROTATE]" blockType="command"
    // //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    // //% ROTATE.shadow="dropdown" ROTATE.options="ROTATE" 
    // export function CameraSetRotate(parameter: any) {
    //     
    //     let rotate = parameter.ROTATE.code;
    //     Generator.addCode(`sentry.CameraSetRotate(${rotate})`);
    // }

    // //% block="Sentry set camera [FPS]" blockType="command"
    // //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    // //% FPS.shadow="dropdown" FPS.options="FPS" 
    // export function CameraSetFPS(parameter: any) {
    //     
    //     let fps = parameter.FPS.code;
    //     Generator.addCode(`sentry.CameraSetFPS(${fps})`);
    // }

    //% block="Sentry set camera [AWB]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% AWB.shadow="dropdown" AWB.options="AWB" 
    export function CameraSetAwb(parameter: any) {

        let awb = parameter.AWB.code;
        Generator.addCode(`sentry.CameraSetAwb(${awb})`);
    }

    //% block="Sentry set [VISION_TYPE] default" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"   
    export function VisionSetDefault(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode(`sentry.VisionSetDefault(${vision_type})`);
    }

    //% block="Sentry get vision [VISION_TYPE] status" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"    
    export function GetVisionResult(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode([`sentry.GetValue(${vision_type}, sentry_obj_info_e.kStatus)`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry get [VISION_TYPE] [VISION_ID] [OBJ_INFO]" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% VISION_ID.shadow="number"
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO"    
    export function GetValue(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.VISION_ID.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(${vision_type},${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry get Qr value" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"  
    export function GetQrCodeValue(parameter: any) {

        Generator.addCode([`sentry.GetQrCodeValue()`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry get Color [NUM] [OBJ_RGB_INFO]" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number"
    //% OBJ_RGB_INFO.shadow="dropdown" OBJ_RGB_INFO.options="OBJ_RGB_INFO"    
    export function GetColorValue(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.OBJ_RGB_INFO.code;
        Generator.addCode([`sentry.GetValue(sentry_vision_e.kVisionColor,${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry Color detected [NUM] [COLOR_LABLE]" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number"
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorLable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sentry.GetValue(sentry_vision_e.kVisionColor,sentry_obj_info_e.kLabel,${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry Blob detected [NUM] [COLOR_LABLE]" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number"
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorBlob(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sentry.GetValue(sentry_vision_e.kVisionBlob,sentry_obj_info_e.kLabel,${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry get 20 Class detected [NUM] [Class20_LABLE]" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number"
    //% Class20_LABLE.shadow="dropdown" Class20_LABLE.options="Class20_LABLE"    
    export function GetClass20Lable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.Class20_LABLE.code;
        Generator.addCode([`sentry.GetValue(sentry_vision_e.kVision20Classes,sentry_obj_info_e.kLabel,${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry Card detected [NUM] [CARD_LABLE]" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number"
    //% CARD_LABLE.shadow="dropdown" CARD_LABLE.options="CARD_LABLE"    
    export function GetCardLable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.CARD_LABLE.code;
        Generator.addCode([`sentry.GetValue(sentry_vision_e.kVisionCard,sentry_obj_info_e.kLabel,${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry Get [VISION_TYPE] Status" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    export function VisionGetStatus(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode(`sentry.VisionGetStatus(${vision_type})`);
    }

    //% block="Sentry image height" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    export function rows(parameter: any) {


        Generator.addCode([`sentry.rows()`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry image width" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    export function cols(parameter: any) {


        Generator.addCode([`sentry.cols()`, Generator.ORDER_UNARY_POSTFIX]);
    }
}
