### 한글 해석

### **리스트 위에 검색 필드가 표시됩니다**

**코딩**

Walkthrough - Step 23에서 모든 파일을 볼 수 있고 다운로드할 수 있습니다.

#### `webapp/view/InvoiceList.view.xml`

```xml
<mvc:View
   controllerName="ui5.walkthrough.controller.InvoiceList"
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <List
      id="invoiceList"
      class="sapUiResponsiveMargin"
      width="auto"
      items="{invoice>/Invoices}" >
      <headerToolbar>
         <Toolbar>
            <Title text="{i18n>invoiceListTitle}"/>
            <ToolbarSpacer/>
            <SearchField 
               width="50%" 
               search=".onFilterInvoices"/>
         </Toolbar>
      </headerToolbar>
      ...
</mvc:View>
```

이 뷰는 인보이스 리스트에 추가된 검색 컨트롤로 확장되었습니다. 또한, 검색 필드에 추가한 이벤트 핸들러 함수 `onFilterInvoices`에서 리스트를 식별할 수 있도록 `invoiceList`라는 ID를 리스트 컨트롤에 지정해야 합니다. 검색 필드는 리스트 헤더의 일부이며, 따라서 리스트 바인딩의 변경사항이 발생하면 검색 필드를 포함한 전체 리스트가 다시 렌더링됩니다.

`headerToolbar` 집합은 이전에 리스트 헤더로 사용했던 간단한 `title` 속성을 대체합니다. `Toolbar` 컨트롤은 훨씬 유연하며 원하는 대로 조정할 수 있습니다. 이제 `sap.m.Title` 컨트롤로 타이틀을 왼쪽에 표시하고, `ToolbarSpacer`를 사용해 오른쪽에 `sap.m.SearchField`를 배치합니다.

#### `webapp/controller/InvoiceList.controller.js`

```javascript
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, JSONModel, formatter, Filter, FilterOperator) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
		formatter: formatter, 

		onInit() {
			const oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		},

		onFilterInvoices(oEvent) {
			// 필터 배열 생성
			const aFilter = [];
			const sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}

			// 바인딩 필터링
			const oList = this.byId("invoiceList");
			const oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});
});
```

필터링을 위해 두 가지 새로운 종속성을 로드합니다. `Filter` 객체는 필터 작업의 구성을 저장하며, `FilterOperator`는 필터를 지정할 때 필요한 헬퍼 타입입니다.

`onFilterInvoices` 함수에서는 사용자가 검색 필드에 입력한 검색 문자열로부터 필터 객체를 생성합니다. 이벤트 핸들러는 항상 이벤트 인수를 받으며, 이를 통해 이벤트가 제공하는 매개변수에 접근할 수 있습니다. 우리의 경우, 검색 필드는 `query`라는 매개변수를 정의하며, 이를 `oEvent` 매개변수에서 `getParameter("query")`를 호출하여 접근합니다.

쿼리가 비어 있지 않다면, 새로운 필터 객체를 아직 비어 있는 필터 배열에 추가합니다. 그러나 쿼리가 비어 있으면, 빈 배열로 바인딩을 필터링합니다. 이를 통해 모든 리스트 요소가 다시 표시되도록 보장합니다. 우리는 더 많은 데이터 필드를 검색하고 싶다면, 배열에 더 많은 필터를 추가할 수도 있습니다. 예제에서는 `ProductName` 경로에서만 검색하며, 주어진 쿼리 문자열을 검색할 필터 연산자를 지정합니다.

리스트는 뷰에서 지정한 ID로 접근합니다. 컨트롤이 자동으로 뷰 ID로 접두어가 붙기 때문에, 뷰에서 `byId`라는 헬퍼 함수를 사용하여 컨트롤을 요청해야 합니다. 리스트 컨트롤에서 집합 `items`의 바인딩에 접근하여 새로 생성된 필터 객체로 필터링합니다. 이렇게 하면 검색이 트리거될 때 일치하는 항목만 표시되도록 리스트가 자동으로 필터링됩니다. 필터 연산자 `FilterOperator.Contains`는 대소문자를 구분하지 않습니다.