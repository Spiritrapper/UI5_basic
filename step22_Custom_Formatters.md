### 한국어 해석

### **이제 상태가 사용자 정의 포매터로 표시됩니다**

**코딩**

Walkthrough - Step 22에서 모든 파일을 볼 수 있고 다운로드할 수 있습니다.

#### `webapp/model/formatter.js` (새로 추가됨)

```javascript
sap.ui.define([], () => {
	"use strict";

	return {
		statusText(sStatus) {
			const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			switch (sStatus) {
				case "A":
					return oResourceBundle.getText("invoiceStatusA");
				case "B":
					return oResourceBundle.getText("invoiceStatusB");
				case "C":
					return oResourceBundle.getText("invoiceStatusC");
				default:
					return sStatus;
			}
		}
	};
});
```

우리는 앱 프로젝트에 `model`이라는 새 폴더를 생성합니다. 새 포매터 파일은 앱의 모델 폴더에 위치하며, 포매터는 데이터 속성에 작업을 수행하고 이를 UI에 표시하기 위해 포맷합니다. 지금까지는 `Invoices.json` 파일 외에는 모델 관련 아티팩트가 없었으므로, 이제 `webapp/model` 폴더를 앱에 추가할 것입니다. 이번에는 어떤 기본 객체에서 확장하지 않고, 단순히 `sap.ui.define` 호출 내에서 포매터 함수가 포함된 자바스크립트 객체를 반환합니다.

`statusText` 함수는 데이터 모델에서 기술적인 상태를 입력 매개변수로 받아서 `resourceBundle` 파일에서 올바른 사람 읽기 가능한 텍스트를 반환합니다.

**참고**
위 예제에서 `this`는 포매터가 호출되는 즉시 컨트롤러 인스턴스를 참조합니다. 우리는 `this.getOwnerComponent().getModel()`을 사용하여 구성 요소를 통해 데이터 모델에 접근하며, `this.getView().getModel()`을 사용하는 대신에 이렇게 접근합니다. 후자의 호출은 undefined를 반환할 수 있으며, 이는 뷰가 아직 컴포넌트에 연결되지 않았기 때문에 뷰가 컴포넌트에서 모델을 상속받을 수 없기 때문입니다.

#### 추가 정보:

- **API 참조**: sap.ui.core.mvc.Controller#getOwnerComponent.
- **API 참조**: sap.ui.core.mvc.Controller#onInit.

#### `webapp/controller/InvoiceList.controller.js`

```javascript
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter"
], (Controller, JSONModel, formatter) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
		formatter: formatter,
		onInit() {
			const oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		}
	});
});
```

포매터 함수를 로드하기 위해, 이를 `InvoiceList.controller.js`에 추가해야 합니다. 이 컨트롤러에서는 먼저 사용자 정의 포매터 모듈에 대한 종속성을 추가합니다. 컨트롤러는 로드된 포매터 함수를 로컬 속성 `formatter`에 저장하여 뷰에서 접근할 수 있게 합니다.

#### `webapp/view/InvoiceList.view.xml`

```xml
<mvc:View
    controllerName="ui5.walkthrough.controller.InvoiceList"
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc">
    <List
        headerText="{i18n>invoiceListTitle}"
        class="sapUiResponsiveMargin"
        width="auto"
        items="{invoice>/Invoices}">
        <items>
            <ObjectListItem
                title="{invoice>Quantity} x {invoice>ProductName}"
                number="{
                    parts: [
                        'invoice>ExtendedPrice',
                        'view>/currency'
                    ],
                    type: 'sap.ui.model.type.Currency',
                    formatOptions: {
                        showMeasure: false
                    }
                }"
                numberUnit="{view>/currency}"
                numberState="{= ${invoice>ExtendedPrice} > 50 ? 'Error' : 'Success' }">
                <firstStatus>
                    <ObjectStatus
                        text="{
                            path: 'invoice>Status',
                            formatter: '.formatter.statusText'
                        }"/>
                </firstStatus>
            </ObjectListItem>
        </items>
    </List>
</mvc:View>
```

우리는 `ObjectListItem`에 `firstStatus` 집합을 사용하여 인보이스의 상태를 표시하는 상태를 추가합니다. 사용자 정의 포매터 함수는 바인딩 구문의 예약 속성 `formatter`으로 지정됩니다. 포매터 이름 앞에 "."이 붙으면 해당 함수가 현재 뷰의 컨트롤러에서 찾아진다는 의미입니다. 우리는 컨트롤러에서 `formatter` 속성을 정의하여 포매터 함수에 접근할 수 있게 했기 때문에 `.formatter.statusText`로 접근할 수 있습니다.

#### `webapp/i18n/i18n.properties`

```properties
# App Descriptor
appTitle=Hello World
appDescription=A simple walkthrough app that explains the most important concepts of SAPUI5

# Hello Panel
showHelloButtonText=Say Hello
helloMsg=Hello {0}
homePageTitle=Walkthrough
helloPanelTitle=Hello World
openDialogButtonText=Say Hello With Dialog
dialogCloseButtonText=Ok

# Invoice List
invoiceListTitle=Invoices
invoiceStatusA=New
invoiceStatusB=In Progress
invoiceStatusC=Done
```

세 가지 새 항목을 리소스 번들에 추가하여 상태 텍스트를 번역했습니다. 이 텍스트는 이제 인보이스의 상태에 따라 `ObjectListItem`의 `number` 속성 아래에 표시됩니다.