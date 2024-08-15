### SAPUI5 내비게이션 기능을 사용하여 세부 페이지를 로드하고 표시하기

이 단계에서는 SAPUI5 내비게이션 기능을 사용하여 세부 페이지를 로드하고 표시하는 방법을 학습합니다. 이 페이지는 나중에 청구서(invoices)의 세부 정보를 표시하는 데 사용됩니다. 이전 단계에서는 앱 뷰에 페이지를 직접 정의하여 앱이 로드될 때 표시되도록 했습니다. 이제 SAPUI5 라우터 클래스(router class)를 사용하여 페이지를 로드하고 URL을 자동으로 업데이트하도록 설정합니다. 이를 위해 앱에 라우팅 구성을 지정하고, 각 페이지에 대해 별도의 뷰를 생성한 다음, 내비게이션 이벤트를 트리거하여 뷰를 연결합니다.

### 미리보기

- **페이지 1:** Walkthrough - Details 헤더와 청구서 본문이 포함된 페이지
- **페이지 2:** 청구서를 표시하기 위한 두 번째 페이지 추가

### 코딩 (예제 코드 및 설명)

#### `webapp/manifest.json` 파일 수정

```json
{
  ...
  "sap.ui5": {
  ...
    "routing": {
      "config": {
        "routerClass": "sap.m.routing.Router",
        "type": "View",
        "viewType": "XML",
        "path": "ui5.walkthrough.view",
        "controlId": "app",
        "controlAggregation": "pages"
      },
      "routes": [
        {
          "pattern": "",
          "name": "overview",
          "target": "overview"
        },
        {
          "pattern": "detail",
          "name": "detail",
          "target": "detail"
        }
      ],
      "targets": {
        "overview": {
          "id": "overview",
          "name": "Overview"
        },
        "detail": {
          "id": "detail",
          "name": "Detail"
        }
      }
    }
  }
}
```

`manifest.json` 파일의 `sap.ui5` 부분에 새로운 "routing" 섹션을 추가합니다. 라우팅 및 내비게이션 구조를 정의하는 세 가지 하위 섹션이 있습니다:

- **config:** 전역 라우터 설정 및 기본값이 포함됩니다. 여기서 사용할 라우터 클래스, 뷰의 위치, 페이지를 표시할 컨트롤, 새 페이지가 표시될 때 채울 aggregation을 지정합니다.
  
- **routes:** 각 경로(route)는 이름, 패턴, 내비게이션할 대상(target)을 정의합니다. 첫 번째 경로는 기본 경로로, 콘텐츠를 보여줄 개요 페이지를 표시합니다. 두 번째 경로는 "detail" 패턴을 가진 상세 페이지를 표시합니다.

- **targets:** 각 대상은 표시할 뷰 또는 컴포넌트를 정의하며, 하나 이상의 경로와 연결되거나 앱 내에서 수동으로 표시될 수 있습니다. 이 앱에서는 "overview"와 "detail"이라는 두 가지 대상을 정의합니다.

#### `webapp/Component.js` 파일 수정

```javascript
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], (UIComponent, JSONModel) => {
	"use strict";

	return UIComponent.extend("ui5.walkthrough.Component", {

		metadata: {
			interfaces: ["sap.ui.core.IAsyncContentCreation"],
			manifest: "json"
		},

		init() {
			// 부모 클래스의 init 함수 호출
			UIComponent.prototype.init.apply(this, arguments);

			// 데이터 모델 설정
			const oData = {
				recipient: {
					name: "World"
				}
			};
			const oModel = new JSONModel(oData);
			this.setModel(oModel);

			// URL/해시 기반 뷰 생성
			this.getRouter().initialize();
		}
	});
});
```

컴포넌트 초기화 메서드에서 라우터를 초기화하는 호출을 추가합니다. 라우터는 앱 디스크립터(AppDescriptor) 구성에 따라 자동으로 인스턴스화되며, 컴포넌트에 할당됩니다. 라우터를 초기화하면 현재 URL을 평가하고 해당 뷰를 자동으로 로드하고 표시합니다.

#### `webapp/view/Overview.view.xml` 파일 생성

```xml
<mvc:View
    controllerName="ui5.walkthrough.controller.App"
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc"
    displayBlock="true">
    <Page title="{i18n>homePageTitle}">
        <content>
            <mvc:XMLView viewName="ui5.walkthrough.view.HelloPanel" />
            <mvc:XMLView viewName="ui5.walkthrough.view.InvoiceList" />
        </content>
    </Page>
</mvc:View>
```

이전 단계에서 사용한 내용을 `App.view.xml`에서 `Overview.view.xml`로 이동합니다. 뷰에서 컨트롤러를 변경하지 않고 동일한 컨트롤러를 재사용합니다.

#### `webapp/view/App.view.xml` 파일 수정

```xml
<mvc:View
    controllerName="ui5.walkthrough.controller.App"
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc"
    displayBlock="true">
    <Shell>
        <App
            class="myAppDemoWT"
            id="app"/>
    </Shell>
</mvc:View>
```

`App.view.xml` 파일은 이제 빈 `app` 태그만 포함합니다. 라우터는 현재 URL에 해당하는 뷰를 자동으로 추가합니다.

#### `webapp/view/Detail.view.xml` 파일 생성

```xml
<mvc:View
	xmlns="sap.m"
	xmlns:mvc="sap.ui.core.mvc">
	<Page
		title="{i18n>detailPageTitle}">
		<ObjectHeader title="Invoice"/>
	</Page>
</mvc:View>
```

세부 페이지를 위한 새로운 뷰를 추가합니다. 이 뷰는 페이지와 `ObjectHeader` 컨트롤을 포함하고 있으며, 현재는 `Invoice`라는 정적 텍스트를 표시합니다.

#### `webapp/i18n/i18n.properties` 파일 수정

```properties
…
# Invoice List
invoiceListTitle=Invoices
invoiceStatusA=New
invoiceStatusB=In Progress
invoiceStatusC=Done

# Detail Page
detailPageTitle=Walkthrough - Details
```

세부 페이지의 제목에 대한 새로운 문자열을 리소스 번들에 추가합니다.

#### `webapp/view/InvoiceList.view.xml` 파일 수정

```xml
<mvc:View
    controllerName="ui5.walkthrough.controller.InvoiceList"
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc">
    ...
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
                numberState="{= ${invoice>ExtendedPrice} > 50 ? 'Error' : 'Success' }"
                type="Navigation"
                press=".onPress" >
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

청구서 목록 뷰에 `press` 이벤트를 추가하고, 목록 항목의 유형을 `Navigation`으로 설정하여 항목을 클릭할 수 있도록 합니다.

#### `webapp/controller/InvoiceList.controller.js` 파일 수정

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

		…

		onPress() {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail");
		}
	});
});
```

청구서 목록의 컨트롤러에 이벤트 핸들러 함수를 추가합니다. 목록 항목을 클릭하면 세부 페이지로 이동합니다. 앱의 라우터 인스턴스에 접근한 후, `navTo` 메서드를 호출하여 라우팅 구성에서 지정한 세부 경로로 이동합니다.

이제 목록에서 항목을 클릭하면 세부 페이지를 볼 수 있습니다.

### 주요 사항 정리
- **라우팅 구성을 디스크립터에 정의합니다.**
- **컴포넌트의 `init` 함수 끝에서 라우터를 초기화합니다.**