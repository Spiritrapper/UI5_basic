sap.ui.define([
    "sap/ui/core/Control",   // SAPUI5의 기본 Control 클래스를 가져옵니다.
    "sap/m/RatingIndicator", // 별점 평가 기능을 제공하는 RatingIndicator 클래스를 가져옵니다.
    "sap/m/Label",           // 텍스트 레이블을 표시하는 Label 클래스를 가져옵니다.
    "sap/m/Button"           // 버튼 기능을 제공하는 Button 클래스를 가져옵니다.
], (Control, RatingIndicator, Label, Button) => {
    "use strict";

    return Control.extend("ui5.walkthrough.control.ProductRating", {
        metadata: {
            properties: {
                value: { type: "float", defaultValue: 0 } // 'value'라는 속성을 정의하고 기본값을 0으로 설정합니다.
            },
            aggregations: {
                _rating: { type: "sap.m.RatingIndicator", multiple: false, visibility: "hidden" }, // RatingIndicator를 비공식 집합으로 정의하고 숨깁니다.
                _label: { type: "sap.m.Label", multiple: false, visibility: "hidden" }, // Label을 비공식 집합으로 정의하고 숨깁니다.
                _button: { type: "sap.m.Button", multiple: false, visibility: "hidden" } // Button을 비공식 집합으로 정의하고 숨깁니다.
            },
            events: {
                change: {
                    parameters: {
                        value: { type: "int" } // 'change' 이벤트에 'value'라는 정수형 파라미터를 설정합니다.
                    }
                }
            }
        },

        init() {
            // 컨트롤이 생성될 때 호출되는 초기화 메서드
            this.setAggregation("_rating", new RatingIndicator({
                value: this.getValue(), // 컨트롤의 값으로 초기화합니다.
                iconSize: "2rem",       // 별 아이콘의 크기를 설정합니다.
                visualMode: "Half",     // 시각적 모드를 반별로 설정합니다.
                liveChange: this._onRate.bind(this) // 실시간 변경 시 _onRate 메서드를 호출합니다.
            }));
            this.setAggregation("_label", new Label({
                text: "{i18n>productRatingLabelInitial}" // 초기 텍스트를 i18n에서 가져온 값으로 설정합니다.
            }).addStyleClass("sapUiSmallMargin")); // 스타일 클래스를 추가하여 작은 여백을 설정합니다.
            this.setAggregation("_button", new Button({
                text: "{i18n>productRatingButton}", // 버튼 텍스트를 i18n에서 가져온 값으로 설정합니다.
                press: this._onSubmit.bind(this) // 버튼 클릭 시 _onSubmit 메서드를 호출합니다.
            }).addStyleClass("sapUiTinyMarginTopBottom")); // 버튼에 작은 상하 여백을 추가합니다.
        },

        setValue(fValue) {
            this.setProperty("value", fValue, true); // 'value' 속성을 설정합니다. 이때 내부적으로는 업데이트를 무시합니다.
            this.getAggregation("_rating").setValue(fValue); // 집합인 _rating의 값을 업데이트합니다.

            return this; // 체이닝을 지원하기 위해 현재 객체를 반환합니다.
        },

        reset() {
            const oResourceBundle = this.getModel("i18n").getResourceBundle(); // i18n 모델에서 리소스 번들을 가져옵니다.

            this.setValue(0); // 값을 0으로 재설정합니다.
            this.getAggregation("_label").setDesign("Standard"); // 레이블 디자인을 기본으로 설정합니다.
            this.getAggregation("_rating").setEnabled(true); // 별점 평가 기능을 활성화합니다.
            this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelInitial")); // 레이블의 텍스트를 초기 값으로 설정합니다.
            this.getAggregation("_button").setEnabled(true); // 버튼을 활성화합니다.
        },

        _onRate(oEvent) {
            const oRessourceBundle = this.getModel("i18n").getResourceBundle(); // i18n 모델에서 리소스 번들을 가져옵니다.
            const fValue = oEvent.getParameter("value"); // 별점의 현재 값을 가져옵니다.

            this.setProperty("value", fValue, true); // 'value' 속성을 업데이트합니다.

            // 레이블의 텍스트를 업데이트합니다. 현재 별점과 최대 별점을 표시합니다.
            this.getAggregation("_label").setText(oRessourceBundle.getText("productRatingLabelIndicator", [fValue, oEvent.getSource().getMaxValue()]));
            this.getAggregation("_label").setDesign("Bold"); // 레이블의 디자인을 굵게 설정합니다.
        },

        _onSubmit(oEvent) {
            const oResourceBundle = this.getModel("i18n").getResourceBundle(); // i18n 모델에서 리소스 번들을 가져옵니다.

            this.getAggregation("_rating").setEnabled(false); // 별점 평가 기능을 비활성화합니다.
            this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelFinal")); // 레이블의 텍스트를 최종 값으로 설정합니다.
            this.getAggregation("_button").setEnabled(false); // 버튼을 비활성화합니다.
            this.fireEvent("change", { // 'change' 이벤트를 발생시키고 현재 값을 전달합니다.
                value: this.getValue()
            });
        },

        renderer(oRm, oControl) {
            oRm.openStart("div", oControl); // 렌더링을 시작합니다.
            oRm.class("myAppDemoWTProductRating"); // CSS 클래스를 설정합니다.
            oRm.openEnd(); // 렌더링을 끝냅니다.
            oRm.renderControl(oControl.getAggregation("_rating")); // _rating 집합을 렌더링합니다.
            oRm.renderControl(oControl.getAggregation("_label")); // _label 집합을 렌더링합니다.
            oRm.renderControl(oControl.getAggregation("_button")); // _button 집합을 렌더링합니다.
            oRm.close("div"); // div 요소를 닫습니다.
        }
    });
});


// ### 요약

// - **`sap.ui.define`**: 모듈 의존성을 정의하고, 컨트롤을 확장하여 새로운 `ProductRating` 컨트롤을 구현합니다.
// - **`metadata`**: 컨트롤의 속성, 집합(aggregation), 이벤트를 정의합니다.
// - **`init()`**: 컨트롤이 생성될 때 기본 집합을 초기화하고, 스타일을 설정합니다.
// - **`setValue(fValue)`**: 별점의 값을 설정하고, 집합의 값을 업데이트합니다.
// - **`reset()`**: 별점, 레이블, 버튼 상태를 초기 상태로 재설정합니다.
// - **`_onRate(oEvent)`**: 별점이 변경될 때 호출되며, 레이블을 업데이트합니다.
// - **`_onSubmit(oEvent)`**: 제출 버튼 클릭 시 호출되며, 상태를 최종 상태로 설정하고 'change' 이벤트를 발생시킵니다.
// - **`renderer(oRm, oControl)`**: HTML 요소를 렌더링하는 방법을 정의합니다.

// 이 코드는 사용자 정의 컨트롤을 생성하여 별점을 평가하고, 평가 결과를 제출하는 기능을 구현합니다.