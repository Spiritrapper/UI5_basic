sap.ui.define([
    "sap/ui/core/mvc/Controller", // SAPUI5의 기본 컨트롤러 클래스를 가져옵니다.
    "sap/ui/core/routing/History", // 내비게이션 기록을 관리하는 History 클래스를 가져옵니다.
    "sap/m/", // 주석 처리된 부분으로, 현재는 사용되지 않는 `sap/m` 모듈의 모든 하위 모듈을 가져오려는 시도가 있습니다.
    "sap/ui/model/json/JSONModel" // JSON 데이터를 처리할 수 있는 JSONModel 클래스를 가져옵니다.
], (Controller, History, MessageToast, JSONModel) => { // 가져온 모듈들을 매개변수로 받습니다.
    "use strict"; // 엄격 모드를 활성화하여 코드의 오류를 방지하고 더 안전한 실행을 보장합니다.

    return Controller.extend("ui5.walkthrough.controller.Detail", {
        // Controller를 확장하여 새로운 `Detail` 컨트롤러를 정의합니다.

        onInit() {
            // 뷰가 초기화될 때 호출되는 메서드입니다.
            const oViewModel = new JSONModel({
                currency: "EUR" // 기본 통화 값을 'EUR'로 설정한 JSONModel을 생성합니다.
            });
            this.getView().setModel(oViewModel, "view"); 
            // 생성한 JSONModel을 'view'라는 이름으로 뷰에 설정합니다.

            const oRouter = this.getOwnerComponent().getRouter();
            // 애플리케이션의 라우터를 가져옵니다.
            oRouter.getRoute("detail").attachPatternMatched(this.onObjectMached, this);
            // 'detail' 라우트가 일치할 때 `onObjectMached` 메서드를 호출하도록 이벤트를 연결합니다.
        },

        onObjectMached(oEvent) {
            // 'detail' 라우트와 일치할 때 호출되는 메서드입니다.
            this.byId("rating").reset();
            // ID가 "rating"인 컨트롤을 찾아서 초기화합니다.
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                // URL 경로에서 인코딩된 invoicePath를 디코딩하여 데이터 바인딩 경로를 설정합니다.
                model: "invoice" // 데이터 모델 이름을 'invoice'로 설정합니다.
            });
        },

        onNavBack() {
            // 뒤로 가기 내비게이션 메서드입니다.
            const oHistory = History.getInstance();
            // History 인스턴스를 가져옵니다.
            const sPreviousHash = oHistory.getPreviousHash();
            // 이전 해시 값을 가져옵니다.

            if (sPreviousHash !== undefined) {
                // 이전 해시가 존재하면
                window.history.go(-1); 
                // 브라우저의 이전 페이지로 이동합니다.
            } else {
                // 이전 해시가 존재하지 않으면
                const oRouter = this.getOwnerComponent().getRouter();
                // 애플리케이션의 라우터를 가져옵니다.
                oRouter.navTo("overview", {}, true);
                // 'overview' 라우트로 내비게이션합니다.
            }
        },

        onRatingChange(oEvent) {
            // 사용자 평점 변경 시 호출되는 메서드입니다.
            const fValue = oEvent.getParameter("value");
            // 평점 값을 가져옵니다.
            const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            // 'i18n' 모델에서 리소스 번들을 가져옵니다.

            MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
            // 'ratingConfirmation' 메시지를 리소스 번들에서 가져오고 평점 값을 포함하여 MessageToast로 표시합니다.
        }
    });
});

```
요약
sap.ui.define: 필요한 모듈을 정의하고 Controller를 확장하여 새로운 Detail 컨트롤러를 생성합니다.
Controller: SAPUI5의 기본 컨트롤러 클래스를 사용합니다.
History: 내비게이션 기록을 관리합니다.
MessageToast: 사용자에게 메시지를 표시합니다 (현재 코드에는 사용되지 않음).
JSONModel: JSON 데이터를 처리하는 모델을 사용합니다.

onInit() 메서드는 초기화 시 통화 정보를 설정하고 라우팅을 설정합니다. onObjectMached() 메서드는 라우트가 일치할 때 데이터를 바인딩하고 평점을 초기화합니다. onNavBack() 메서드는 이전 페이지로 돌아가거나 'overview' 페이지로 내비게이션합니다. onRatingChange() 메서드는 평점이 변경될 때 사용자에게 알림을 표시합니다.

```