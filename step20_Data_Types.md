### 한국어 해석

### **가격과 단위 수량이 포함된 청구서 목록**

**코딩**

Walkthrough - Step 20에서 모든 파일을 볼 수 있고 다운로드할 수 있습니다.

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
                numberUnit="{view>/currency}"/>
        </items>
    </List>
</mvc:View>
```

`ObjectListItem` 컨트롤에 `number`와 `numberUnit` 속성을 추가하여 청구서 목록에 가격을 추가했습니다. 그런 다음 바인딩 구문에서 `type` 속성을 `sap.ui.model.type.Currency`로 설정하여 숫자에 통화 데이터 유형을 적용했습니다.

위에서 볼 수 있듯이, 우리는 `ObjectListItem`의 `number` 속성에 특별한 바인딩 구문을 사용하고 있습니다. 이 바인딩 구문은 "계산된 필드"라는 것을 사용하며, 이를 통해 다른 모델의 여러 속성을 하나의 컨트롤 속성에 바인딩할 수 있습니다. 서로 다른 모델에서 바인딩된 속성은 "parts"라고 불립니다. 위 예제에서는, 컨트롤의 속성은 `number`이고, 두 개의 다른 모델에서 가져온 바인딩된 속성(`parts`)은 `invoice>ExtendedPrice`와 `view>/currency`입니다.

우리는 유로화로 가격을 표시하려고 하며, 일반적으로 통화는 백엔드 데이터 모델의 일부입니다. 하지만 이 경우 그렇지 않기 때문에 앱에서 직접 정의해야 합니다. 따라서 청구서 목록의 컨트롤러를 추가하고, 바인딩 구문의 두 번째 부분으로 통화 속성을 사용합니다. `Currency` 유형은 통화 코드에 따라 가격의 형식을 자동으로 처리해 줍니다. 이 경우, 가격은 소수점 2자리로 표시됩니다.

추가적으로, `showMeasure` 형식 옵션을 `false`로 설정했습니다. 이렇게 하면 통화 코드가 숨겨지며, 이는 `numberUnit` 속성으로 `ObjectListItem` 컨트롤에 별도로 전달됩니다.

#### `webapp/controller/InvoiceList.controller.js` (새 파일)

```javascript
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
		onInit() {
			const oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		}
	});
});
```

우리의 데이터 모델에 포함되지 않은 통화 코드를 접근할 수 있도록 하기 위해, 청구서 목록 컨트롤러에서 뷰 모델을 정의했습니다. 이것은 `currency`라는 키와 `EUR`라는 값을 가진 간단한 JSON 모델입니다. 이는 숫자 필드의 포맷터에 바인딩될 수 있습니다. 뷰 모델은 가시성과 같은 속성을 바인딩하기 위해 컨트롤에 할당된 모든 구성 옵션을 보유할 수 있습니다.

**관례**
가능하면 사용자 정의 포맷터 대신 데이터 유형을 사용하세요.