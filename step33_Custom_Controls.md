아래는 Custom Product Rating Control에 관한 내용과 관련된 코드와 설명을 한국어로 해석한 것입니다.

---

## 웹 애플리케이션 제어 - ProductRating.js

**웹앱/control/ProductRating.js (새 파일)**

```javascript
sap.ui.define([
	"sap/ui/core/Control"
], (Control) => {
	"use strict";

	return Control.extend("ui5.walkthrough.control.ProductRating", {
		metadata : {},  // 메타데이터 섹션을 정의하지만 현재는 비어 있습니다.

		init() {},  // 제어가 생성될 때 자동으로 호출되는 초기화 함수입니다. 현재는 빈 상태입니다.

		renderer(oRM, oControl) {}  // 제어의 HTML 구조를 정의하는 렌더러 함수입니다. 현재는 빈 상태입니다.
	});
});
```

### 설명
- `ProductRating.js` 파일을 새로 만들고, `sap.ui.core.Control` 클래스를 확장하여 새로운 제어를 정의합니다.
- 사용자 정의 제어는 SAPUI5의 기본 객체인 `sap.ui.core.Control`을 상속받으며, 이 제어는 두 개의 주요 섹션(메타데이터와 렌더러)을 갖고 있습니다.

### 메타데이터 섹션
- **`metadata`**: 제어의 데이터 구조와 API를 정의합니다. 이 정보로 SAPUI5는 자동으로 getter, setter 및 기타 편의 기능을 생성합니다.

### 렌더러 섹션
- **`renderer`**: 제어가 인스턴스화될 때 HTML 구조를 정의합니다. `oRM`(RenderManager) 객체를 사용하여 HTML을 생성합니다.

---

## 커스텀 제어 구현

**웹앱/control/ProductRating.js (확장된 구현)**

```javascript
sap.ui.define([
	"sap/ui/core/Control",    // SAP UI5의 기본 컨트롤 클래스를 불러옵니다.
	"sap/m/RatingIndicator",  // sap.m 라이브러리의 RatingIndicator 컨트롤을 불러옵니다.
	"sap/m/Label",            // sap.m 라이브러리의 Label 컨트롤을 불러옵니다.
	"sap/m/Button"            // sap.m 라이브러리의 Button 컨트롤을 불러옵니다.
], (Control, RatingIndicator, Label, Button) => { // 위에서 불러온 클래스를 콜백 함수의 매개변수로 전달합니다.
	"use strict"; // JavaScript 코드의 엄격 모드를 활성화합니다.

	return Control.extend("ui5.walkthrough.control.ProductRating", { // 새로운 커스텀 컨트롤을 정의합니다.
		metadata : { // 컨트롤의 메타데이터를 정의합니다.
			properties : { // 사용자 정의 속성을 정의합니다.
				value: 	{type : "float", defaultValue : 0} // "value" 속성은 부동 소수점 타입이며 기본값은 0입니다.
			},
			aggregations : { // 이 컨트롤이 포함할 수 있는 하위 컨트롤(aggregation)을 정의합니다.
				_rating : {type : "sap.m.RatingIndicator", multiple: false, visibility : "hidden"}, // RatingIndicator를 숨김 속성으로 정의합니다.
				_label : {type : "sap.m.Label", multiple: false, visibility : "hidden"}, // Label을 숨김 속성으로 정의합니다.
				_button : {type : "sap.m.Button", multiple: false, visibility : "hidden"} // Button을 숨김 속성으로 정의합니다.
			},
			events : { // 컨트롤에서 발생하는 이벤트를 정의합니다.
				change : { // "change" 이벤트를 정의합니다.
					parameters : { // 이벤트 발생 시 전달되는 매개변수를 정의합니다.
						value : {type : "int"} // "value" 매개변수는 정수형입니다.
					}
				}
			}
		},

		init() { // 컨트롤의 초기화를 수행하는 메서드입니다.
			this.setAggregation("_rating", new RatingIndicator({ // RatingIndicator를 생성하고 _rating aggregation에 설정합니다.
				value: this.getValue(), // 초기 value 속성을 설정합니다.
				iconSize: "2rem", // 아이콘 크기를 설정합니다.
				visualMode: "Half", // 반점수 모드로 설정합니다.
				liveChange: this._onRate.bind(this) // liveChange 이벤트에 핸들러를 바인딩합니다.
			}));
			this.setAggregation("_label", new Label({ // Label을 생성하고 _label aggregation에 설정합니다.
				text: "{i18n>productRatingLabelInitial}" // 초기 텍스트를 i18n 모델에서 가져옵니다.
			}).addStyleClass("sapUiSmallMargin")); // 스타일 클래스를 추가합니다.
			this.setAggregation("_button", new Button({ // Button을 생성하고 _button aggregation에 설정합니다.
				text: "{i18n>productRatingButton}", // 버튼 텍스트를 i18n 모델에서 가져옵니다.
				press: this._onSubmit.bind(this) // 버튼의 press 이벤트에 핸들러를 바인딩합니다.
			}).addStyleClass("sapUiTinyMarginTopBottom")); // 스타일 클래스를 추가합니다.
		},

		setValue(fValue) { // value 속성을 설정하는 메서드입니다.
			this.setProperty("value", fValue, true); // "value" 속성을 업데이트하고, 변경 사항을 비동기적으로 처리합니다.
			this.getAggregation("_rating").setValue(fValue); // RatingIndicator의 value 속성도 업데이트합니다.

			return this; // 메서드 체이닝을 위해 this를 반환합니다.
		},

		reset() { // 컨트롤을 초기 상태로 리셋하는 메서드입니다.
			const oResourceBundle = this.getModel("i18n").getResourceBundle(); // i18n 모델에서 리소스 번들을 가져옵니다.

			this.setValue(0); // value를 0으로 초기화합니다.
			this.getAggregation("_label").setDesign("Standard"); // 라벨의 디자인을 기본으로 설정합니다.
			this.getAggregation("_rating").setEnabled(true); // RatingIndicator를 활성화합니다.
			this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelInitial")); // 라벨의 텍스트를 초기 상태로 설정합니다.
			this.getAggregation("_button").setEnabled(true); // 버튼을 활성화합니다.
		},

		_onRate(oEvent) { // RatingIndicator의 값이 변경될 때 호출되는 이벤트 핸들러입니다.
			const oRessourceBundle = this.getModel("i18n").getResourceBundle(); // i18n 모델에서 리소스 번들을 가져옵니다.
			const fValue = oEvent.getParameter("value"); // 이벤트에서 변경된 값을 가져옵니다.

			this.setProperty("value", fValue, true); // value 속성을 업데이트하고 비동기적으로 처리합니다.

			this.getAggregation("_label").setText(oRessourceBundle.getText("productRatingLabelIndicator", [fValue, oEvent.getSource().getMaxValue()])); // 라벨의 텍스트를 업데이트합니다.
			this.getAggregation("_label").setDesign("Bold"); // 라벨의 디자인을 굵게 설정합니다.
		},

		_onSubmit(oEvent) { // 버튼이 눌릴 때 호출되는 이벤트 핸들러입니다.
			const oResourceBundle = this.getModel("i18n").getResourceBundle(); // i18n 모델에서 리소스 번들을 가져옵니다.

			this.getAggregation("_rating").setEnabled(false); // RatingIndicator를 비활성화합니다.
			this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelFinal")); // 라벨의 텍스트를 최종 상태로 업데이트합니다.
			this.getAggregation("_button").setEnabled(false); // 버튼을 비활성화합니다.
			this.fireEvent("change", { // change 이벤트를 발생시킵니다.
				value: this.getValue() // 이벤트 파라미터로 현재 value를 전달합니다.
			});
		},

		renderer(oRm, oControl) { // 커스텀 컨트롤의 렌더링 로직을 정의하는 메서드입니다.
			oRm.openStart("div", oControl); // div 태그를 시작합니다.
			oRm.class("myAppDemoWTProductRating"); // 클래스 이름을 설정합니다.
			oRm.openEnd(); // div 태그를 닫습니다.
			oRm.renderControl(oControl.getAggregation("_rating")); // RatingIndicator를 렌더링합니다.
			oRm.renderControl(oControl.getAggregation("_label")); // Label을 렌더링합니다.
			oRm.renderControl(oControl.getAggregation("_button")); // Button을 렌더링합니다.
			oRm.close("div"); // div 태그를 닫습니다.
		}
	});
});

```
이 코드는 SAP UI5에서 커스텀 컨트롤을 정의하고 사용하는 방법을 보여줍니다. ProductRating이라는 이름의 새로운 컨트롤을 정의하고 있으며, 이 컨트롤은 RatingIndicator, Label, Button의 세 가지 주요 구성 요소로 이루어져 있습니다.
### 설명
- **`init()`**: 제어가 인스턴스화될 때 호출되며, 내부 제어(평점 입력, 레이블, 버튼)를 초기화합니다.
- **`setValue(fValue)`**: 제어의 `value` 속성을 설정하고, 내부 `RatingIndicator`의 값을 업데이트합니다.
- **`reset()`**: 제어의 상태를 초기 상태로 재설정합니다.
- **`_onRate(oEvent)`**: 사용자가 평점을 변경할 때 호출되며, 레이블을 업데이트하고 현재 평점을 표시합니다.
- **`_onSubmit(oEvent)`**: 사용자가 평점을 제출할 때 호출되며, 평점 입력과 버튼을 비활성화하고, `change` 이벤트를 발생시킵니다.
- **`renderer(oRm, oControl)`**: 제어의 HTML 구조를 정의합니다. `div` 요소를 생성하고, 내부 제어를 렌더링합니다.

---

## Detail View - XML 파일

**웹앱/view/Detail.view.xml**

```xml
<mvc:View
	controllerName="ui5.walkthrough.controller.Detail" <!-- 이 뷰와 연결된 컨트롤러의 이름을 지정합니다. -->
	xmlns="sap.m" <!-- SAPUI5 모바일 라이브러리의 XML 네임스페이스를 선언합니다. -->
	xmlns:mvc="sap.ui.core.mvc" <!-- MVC 패턴을 지원하는 SAPUI5의 XML 네임스페이스를 선언합니다. -->
	xmlns:wt="ui5.walkthrough.control"> <!-- 커스텀 컨트롤(ProductRating)을 위한 XML 네임스페이스를 선언합니다. -->
	
	<Page
		title="{i18n>detailPageTitle}" <!-- 페이지 제목을 i18n 모델에서 가져옵니다. -->
		showNavButton="true" <!-- 내비게이션 버튼을 표시합니다. (주로 뒤로가기 버튼) -->
		navButtonPress=".onNavBack"> <!-- 내비게이션 버튼이 눌릴 때 호출되는 이벤트 핸들러(onNavBack)를 지정합니다. -->
		
		<ObjectHeader
			intro="{invoice>ShipperName}" <!-- ObjectHeader의 intro 속성에 ShipperName 바인딩. 송하인의 이름을 표시합니다. -->
			title="{invoice>ProductName}"/> <!-- ObjectHeader의 title 속성에 ProductName 바인딩. 제품 이름을 표시합니다. -->
		
		<wt:ProductRating 
			id="rating" <!-- 이 컨트롤의 ID를 'rating'으로 지정합니다. -->
			class="sapUiSmallMarginBeginEnd" <!-- 클래스 속성을 통해 스타일을 지정합니다. 양 끝에 작은 여백이 추가됩니다. -->
			change=".onRatingChange"/> <!-- 평점이 변경될 때 호출될 이벤트 핸들러(onRatingChange)를 지정합니다. -->
	</Page>
</mvc:View>

```
요약
이 코드는 SAP UI5 XML View에서 페이지와 UI 요소들을 정의합니다.
mvc:View는 뷰를 정의하며, 이 뷰는 Detail 컨트롤러에 의해 제어됩니다.
Page는 제목과 내비게이션 버튼을 포함한 페이지 레이아웃을 정의합니다.
ObjectHeader는 제품과 관련된 간략한 정보를 표시합니다.
ProductRating은 커스텀 컨트롤로, 사용자가 제품에 대한 평점을 매길 수 있는 UI를 제공합니다.
### 설명
- **`xmlns:wt="ui5.walkthrough.control"`**: 커스텀 컨트롤을 참조하기 위해 `wt`라는 네임스페이스를 정의합니다.
- **`<wt:ProductRating>`**: `ProductRating` 제어를 추가하고, `change` 이벤트에 대한 이벤트 핸들러를 등록합니다.
- **`class="sapUiSmallMarginBeginEnd"`**: 레이아웃을 위해 스타일 클래스를 추가합니다.

---

## Detail Controller - JavaScript 파일

**웹앱/controller/Detail.controller.js**

```javascript
sap.ui.define([
	"sap/ui/core/mvc/Controller",   // SAP UI5의 기본 MVC 컨트롤러 클래스를 불러옵니다.
	"sap/ui/core/routing/History",  // 브라우저 히스토리를 관리하는 SAP UI5 모듈을 불러옵니다.
	"sap/m/MessageToast"            // 메시지 토스트를 표시하는 SAP UI5 모듈을 불러옵니다.
], (Controller, History, MessageToast) => {  // 위에서 불러온 클래스를 콜백 함수의 매개변수로 전달합니다.
	"use strict";  // JavaScript의 엄격 모드를 활성화합니다.

	return Controller.extend("ui5.walkthrough.controller.Detail", {  // "ui5.walkthrough.controller.Detail"라는 이름으로 컨트롤러를 확장합니다.

		onObjectMatched(oEvent) {  // 라우터가 특정 객체와 매칭되었을 때 호출되는 이벤트 핸들러입니다.
			this.byId("rating").reset();  // 뷰에서 ID가 "rating"인 커스텀 컨트롤을 찾아 초기화(reset)합니다.
			this.getView().bindElement({  // 뷰의 루트 요소에 데이터를 바인딩합니다.
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),  // URL에서 인코딩된 경로를 디코딩하고, 해당 경로로 데이터 모델을 바인딩합니다.
				model: "invoice"  // "invoice"라는 이름의 모델에 바인딩합니다.
			});
		},

		onNavBack() {  // 내비게이션 버튼이 눌렸을 때 호출되는 메서드입니다.
			const oHistory = History.getInstance();  // History 인스턴스를 가져옵니다.
			const sPreviousHash = oHistory.getPreviousHash();  // 이전 해시(브라우저 히스토리에서)를 가져옵니다.

			if (sPreviousHash !== undefined) {  // 이전 해시가 존재하는 경우
				window.history.go(-1);  // 브라우저 히스토리에서 한 단계 뒤로 이동합니다.
			} else {  // 이전 해시가 없는 경우
				const oRouter = this.getOwnerComponent().getRouter();  // 애플리케이션의 라우터 인스턴스를 가져옵니다.
				oRouter.navTo("overview", {}, true);  // 'overview'라는 이름의 경로로 강제로 이동합니다.
			}
		},

		onRatingChange(oEvent) {  // 평점이 변경될 때 호출되는 메서드입니다.
			const fValue = oEvent.getParameter("value");  // 이벤트에서 새로운 평점 값을 가져옵니다.
			const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();  // i18n 모델에서 리소스 번들을 가져옵니다.

			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));  // 평점 값과 함께 메시지 토스트를 표시합니다.
		}
	});
});

```
요약
이 코드는 SAP UI5에서 사용되는 Detail 컨트롤러의 JavaScript 파일입니다.
주요 기능으로는 URL 경로와 매칭된 데이터 바인딩, 뒤로 가기 기능, 평점 변경 시의 메시지 토스트 표시가 포함됩니다.
각 메서드는 특정 이벤트(라우터 경로 매칭, 내비게이션 버튼 클릭, 평점 변경)에 대응하여 사용자 인터페이스 동작을 제어합니다.
### 설명
- **`onObjectMatched(oEvent)`**: 상세 보기가 표시될 때 평점을 초기화하고, 모델을 뷰에 바인딩합니다.
- **`onNavBack()`**: 뒤로가기 버튼을 클릭할 때 이전 페이지로 이동하거나, `overview` 페이지로 이동합니다.
- **`onRatingChange(oEvent)`**: 평점이 변경되었을 때 호출되어 평점 값을 메시지 토스트로 표시합니다.

---

## CSS 파일

**웹앱/css/style.css**

```css
html[dir="ltr"] .myAppDemoWT .myCustomButton.sapMBtn {
    margin-right: 0.125rem; /* 왼쪽에서 오른쪽으로 텍스트 방향(ltr)인 경우, 'myCustomButton' 클래스의 버튼에 오른쪽 여백을 0.125rem 추가합니다. */
}

html[dir="rtl"] .myAppDemoWT .myCustomButton.sapMBtn {
    margin-left: 0.125rem; /* 오른쪽에서 왼쪽으로 텍스트 방향(rtl)인 경우, 'myCustomButton' 클래스의 버튼에 왼쪽 여백을 0.125rem 추가합니다. */
}

.myAppDemoWT .myCustomText {
    display: inline-block; /* 'myCustomText' 클래스의 요소를 인라인 블록으로 표시하여, 텍스트가 블록처럼 동작하지만 인라인 요소로 취급합니다. */
    font-weight: bold; /* 'myCustomText' 클래스의 요소의 텍스트를 굵게 표시합니다. */
}

/*  ProductRating */
.myAppDemoWTProductRating {
    padding: 0.75rem; /* 'myAppDemoWTProductRating' 클래스의 요소에 모든 방향으로 0.75rem의 안쪽 여백을 추가합니다. */
}

.myAppDemoWTProductRating .sapMRI {
    vertical-align: initial; /* 'myAppDemoWTProductRating' 클래스의 요소 내부에 있는 'sapMRI' 클래스의 요소를 초기 수직 정렬 방식으로 설정합니다. */
}

```
요약
html[dir="ltr"]와 html[dir="rtl"]: 텍스트 방향에 따라 다른 스타일을 적용하여, 왼쪽에서 오른쪽(ltr) 또는 오른쪽에서 왼쪽(rtl) 방향에 따라 여백을 조정합니다.
.myCustomText: 이 클래스의 요소는 인라인 블록으로 표시되며 텍스트는 굵게 표시됩니다.
.myAppDemoWTProductRating: 이 클래스의 요소는 모든 방향으로 0.75rem의 안쪽 여백을 가지고 있습니다.
.sapMRI: 이 클래스는 myAppDemoWTProductRating 클래스 내부의 요소에 수직 정렬 방식을 초기 상태로 설정합니다.
### 설명
- **`myAppDemoWTProductRating`**: `ProductRating` 제어의 루트 클래스에 패딩을 추가하여 내부 제어 주위에 여백을 만듭니다.
- **`.sapMRI`**: 내부 `RatingIndicator` 제어의 수직 정렬을 초기 상태로 설정하여 레이블과 버튼과 정렬되도록 합니다.

---

## i18n 파일

**웹앱/i18n/i18n.properties**

```properties
# Detail Page
detailPageTitle=Walkthrough - Details
ratingConfirmation=이 제품을 {0} 별로 평가하셨습니다.

# Product Rating
productRatingLabelInitial=이 제품을 평가해 주세요.
productRatingLabelIndicator=당신의 평가: {0} 중 {1}
productRatingLabelFinal=평가해 주셔서 감사합니다!
productRatingButton=평가
```

### 설명
- **`i18n.properties`**: 다국어 지원을 위한 리소스 번들입니다. 페이지 제목, 평점 확인 메시지 및 제품 평점 관련 텍스트를 정의합니다.

---

## 규칙

- 사용자 정의 제어는 애플리케이션의 `control` 폴더에 배치합니다.