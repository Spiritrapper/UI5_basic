이 단계에서는 선택된 송장(인보이스) 세부 정보가 세부 페이지에 표시됩니다.

## 코딩
모든 파일은 [Walkthrough - Step 31](https://sapui5.hana.ondemand.com/)에서 볼 수 있고 다운로드할 수 있습니다.

### `webapp/manifest.json`
```json
{
  …
  "sap.ui5": {
    …
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
          "pattern": "detail/{invoicePath}",
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

여기에서는 상세 경로에 `invoicePath`라는 네비게이션 매개변수를 추가하여 선택된 항목의 정보를 세부 페이지에 전달할 수 있게 합니다. 필수 네비게이션 매개변수는 중괄호 `{}`로 정의됩니다.

### `webapp/view/Detail.view.xml`
```xml
<mvc:View
    controllerName="ui5.walkthrough.controller.Detail"
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc">
    <Page
        title="{i18n>detailPageTitle}">
        <ObjectHeader
            intro="{invoice>ShipperName}"
            title="{invoice>ProductName}"/>
    </Page>
</mvc:View>
```

이제 세부 페이지에서 항목의 컨텍스트를 설정하고 `ObjectHeader`의 일부 속성을 송장 모델의 필드에 바인딩합니다. 예시를 간단히 하기 위해 여기서는 두 개의 필드만 표시합니다.

### `webapp/controller/InvoiceList.controller.js`
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

        onPress(oEvent) {
            const oItem = oEvent.getSource();
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("detail", {
                invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
            });
        }
    });
});
```

이 코드에서는 `getSource` 메서드를 사용하여 클릭된 `ObjectListItem`을 가져옵니다. 그리고 클릭된 항목의 정보를 세부 페이지에 전달하여 같은 항목이 표시되도록 합니다.

`navTo` 메서드에서는 네비게이션 매개변수 `invoicePath`에 현재 항목의 정보를 채우기 위한 구성 객체를 추가합니다. 이는 URL을 업데이트하고 동시에 세부 페이지로 이동하게 합니다.

일반적으로 우리는 항목을 식별하기 위해 간단하고 정확한 백엔드 시스템의 키를 사용하지만, 여기서는 예제를 간단하게 유지하기 위해 바인딩 경로를 직접 사용합니다. 바인딩 경로는 SAPUI5 컨트롤의 바인딩 정보를 관리하는 헬퍼 객체인 바인딩 컨텍스트의 일부입니다. URL에 사용되지 않는 특수 문자를 제거하기 위해 `.substr(1)` 메서드를 호출하여 바인딩 경로의 첫 번째 `/`를 제거한 다음 세부 페이지에서 다시 추가합니다. 또한, 바인딩 경로에는 URL에서 허용되지 않는 특수 문자가 포함될 수 있으므로 `encodeURIComponent`로 경로를 인코딩해야 합니다.

### `webapp/controller/Detail.controller.js` (새로 추가됨)
```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.Detail", {
        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
        },

        onObjectMatched(oEvent) {
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                model: "invoice"
            });
        }
    });
});
```

이 마지막 코드는 세부 컨트롤러에서 URL 매개변수 `invoicePath`를 사용해 선택된 항목이 세부 페이지에 표시되도록 컨텍스트를 설정하는 역할을 합니다. `onInit` 메서드에서는 앱의 라우터 인스턴스를 가져와 `detail` 경로에 연결하고, `attachPatternMatched` 메서드를 통해 해당 경로가 일치할 때 호출되는 내부 콜백 함수 `onObjectMatched`를 등록합니다.

`onObjectMatched` 메서드는 라우터에 의해 트리거되며, URL과 네비게이션 매개변수를 액세스할 수 있게 합니다. 여기서 `invoicePath`를 사용하여 `bindElement` 메서드를 호출하여 뷰의 컨텍스트를 설정하고, 이로 인해 UI 컨트롤이 업데이트됩니다. 이 과정을 통해 사용자는 송장 목록에서 항목을 클릭할 때 별도의 페이지에서 해당 송장 세부 정보를 볼 수 있습니다.

### 결론
- `manifest.json` 파일에 라우팅 구성을 정의합니다.
- `Component#init` 함수의 마지막에 라우터를 초기화합니다.