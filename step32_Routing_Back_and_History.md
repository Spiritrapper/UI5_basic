이 단계에서는 상세 페이지에 뒤로 가기 버튼이 표시되도록 합니다.

## 코딩
모든 파일은 [Walkthrough - Step 32](https://sapui5.hana.ondemand.com/)에서 볼 수 있고 다운로드할 수 있습니다.

### `webapp/view/Detail.view.xml`
```xml
<mvc:View
    controllerName="ui5.walkthrough.controller.Detail"
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc">
    <Page
        title="{i18n>detailPageTitle}"
        showNavButton="true"
        navButtonPress=".onNavBack">
        <ObjectHeader
            intro="{invoice>ShipperName}"
            title="{invoice>ProductName}"/>
    </Page>
</mvc:View>
```

상세 페이지에서 `showNavButton` 파라미터를 `true`로 설정하여 뒤로 가기 버튼을 표시하도록 하고, 뒤로 가기 버튼이 눌렸을 때 호출될 이벤트 핸들러를 등록합니다.

### `webapp/controller/Detail.controller.js`
```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], (Controller, History) => {
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
        },

        onNavBack() {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("overview", {}, true);
            }
        }
    });
});
```

여기에서는 `sap.ui.core.routing` 네임스페이스의 `History`라는 새로운 의존성을 로드하여 네비게이션 히스토리를 관리하고, 상세 페이지 컨트롤러에 이벤트 핸들러 구현을 추가합니다.

이벤트 핸들러에서는 네비게이션 히스토리를 접근하여 이전의 해시 값을 확인하려고 합니다. 브라우저 히스토리와 달리, 이 값은 애플리케이션 내에서 네비게이션 단계가 이미 발생한 경우에만 유효한 결과를 얻을 수 있습니다. 그런 경우, 단순히 브라우저 히스토리를 사용하여 이전 페이지로 돌아갑니다. 만약 이전에 네비게이션이 발생하지 않았다면, 라우터에 직접 개요 페이지로 이동하도록 명령할 수 있습니다. 세 번째 파라미터 `true`는 실제로 뒤로 가기를 수행하기 때문에 현재 히스토리 상태를 새로운 상태로 대체하라는 의미입니다. 두 번째 파라미터는 추가 매개변수를 전달하지 않으므로 빈 객체 `{}`로 설정합니다.

이 구현은 브라우저의 뒤로 가기 버튼보다 현재 사용 사례에 더 적합합니다. 브라우저는 단순히 히스토리에서 한 단계 뒤로 가지만, 앱 내에서는 다른 링크에서 왔거나 북마크로 세부 페이지를 직접 열었더라도 항상 개요 페이지로 돌아가길 원하기 때문입니다. 새로운 탭에서 세부 페이지를 직접 로드하고 앱 내의 뒤로 가기 버튼을 클릭해보면, 여전히 개요 페이지로 돌아가는 것을 확인할 수 있습니다.

### 결론
- 히스토리 상태가 불분명할 때 상위 페이지로 돌아갈 수 있는 경로를 추가합니다.