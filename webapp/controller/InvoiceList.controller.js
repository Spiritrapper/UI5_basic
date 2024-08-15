sap.ui.define([
    "sap/ui/core/mvc/Controller", // SAPUI5의 기본 Controller 클래스를 가져옵니다.
    "sap/ui/model/json/JSONModel", // JSON 데이터를 모델로 사용하기 위한 JSONModel 클래스를 가져옵니다.
    "../model/formatter", // 프로젝트 내의 formatter 모듈을 가져옵니다. (이 모듈은 형식 지정 함수들을 포함할 것으로 예상됩니다.)
    "sap/ui/model/Filter", // 필터링 기능을 제공하는 Filter 클래스를 가져옵니다.
    "sap/ui/model/FilterOperator" // 필터 연산자를 정의하는 FilterOperator 클래스를 가져옵니다.
], (Controller, JSONModel, formatter, Filter, FilterOperator) => { // 가져온 모듈들을 매개변수로 받습니다.
    "use strict"; // 엄격 모드를 활성화하여 코드의 오류를 방지하고 더 안전한 실행을 보장합니다.

    return Controller.extend("ui5.walkthrough.controller.InvoiceList", { // 'ui5.walkthrough.controller.InvoiceList' 이름으로 Controller를 확장하여 새로운 컨트롤러를 정의합니다.
        formatter: formatter, // formatter 모듈을 컨트롤러의 속성으로 설정합니다.

        onInit() {
            // 컨트롤러가 초기화될 때 호출되는 메서드입니다.

            const oViewModel = new JSONModel({
                currency: "EUR" // 'currency'라는 속성을 가진 JSON 모델을 생성합니다. 기본 값은 'EUR'입니다.
            });
            this.getView().setModel(oViewModel, "view"); // 생성한 모델을 'view'라는 이름으로 현재 뷰에 설정합니다.
        },

        onFilterInvoices(oEvent) {
            // 인보이스를 필터링하는 메서드입니다.

            const aFilter = []; // 필터 배열을 초기화합니다.
            const sQuery = oEvent.getParameter("query"); // 이벤트에서 쿼리 파라미터를 가져옵니다.
            if (sQuery) {
                // 쿼리가 있는 경우, 'ProductName' 속성을 기반으로 필터를 추가합니다.
                aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
                // 필터는 'ProductName'이 쿼리 문자열을 포함하는 항목만 표시합니다.
            }

            // 필터를 적용합니다.
            const oList = this.byId("invoiceList"); // ID가 'invoiceList'인 리스트 컨트롤을 가져옵니다.
            const oBinding = oList.getBinding("items"); // 리스트의 아이템 바인딩을 가져옵니다.
            oBinding.filter(aFilter); // 필터 배열을 사용하여 아이템 바인딩을 필터링합니다.
        },

        onPress(oEvent) {
            // 리스트 아이템이 클릭되었을 때 호출되는 메서드입니다.

            const oItem = oEvent.getSource(); // 클릭된 아이템을 가져옵니다.
            const oRouter = this.getOwnerComponent().getRouter(); // 현재 컴포넌트의 라우터를 가져옵니다.
            oRouter.navTo("detail", { // 'detail' 라우트로 네비게이션합니다.
                invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
                // 'invoice' 모델의 바인딩 컨텍스트에서 경로를 가져오고, 인코딩하여 'invoicePath' 파라미터로 전달합니다.
                // 경로에서 첫 번째 문자('/')를 제거합니다.
            });
        }
    });
});

```

요약
sap.ui.define: 필요한 모듈을 정의하고 Controller를 확장하여 InvoiceList 컨트롤러를 생성합니다.
onInit(): 초기화 시 currency 속성을 가진 JSONModel을 뷰에 설정합니다.
onFilterInvoices(oEvent): 필터링 기능을 제공하며, 쿼리 문자열을 기준으로 ProductName 필터를 적용합니다.
onPress(oEvent): 리스트 아이템 클릭 시 상세 페이지로 네비게이션합니다. 클릭된 아이템의 바인딩 경로를 인코딩하여 라우터 파라미터로 전달합니다.

```