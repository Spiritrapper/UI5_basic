sap.ui.define([
    "sap/ui/core/mvc/Controller", // SAPUI5의 기본 Controller 클래스를 가져옵니다.
    "sap/m/MessageToast" // 사용자에게 메시지를 표시하기 위한 MessageToast 클래스를 가져옵니다.
], (Controller, MessageToast) => { // 가져온 모듈들을 매개변수로 받습니다.
    "use strict"; // 엄격 모드를 활성화하여 코드의 오류를 방지하고 더 안전한 실행을 보장합니다.

    return Controller.extend("ui5.walkthrough.controller.HelloPanel", {
        // 'ui5.walkthrough.controller.HelloPanel' 이름으로 Controller를 확장하여 새로운 컨트롤러를 정의합니다.

        onShowHello() {
            // 'onShowHello' 메서드는 메시지를 표시하는 기능을 담당합니다.

            // i18n 모델에서 메시지 리소스를 읽어옵니다.
            const oBundle = this.getView().getModel("i18n").getResourceBundle();
            // 현재 뷰에서 'i18n' 모델을 가져오고, 그 모델에서 리소스 번들을 얻습니다.
            
            const sRecipient = this.getView().getModel().getProperty("/recipient/name");
            // 현재 뷰의 기본 모델에서 '/recipient/name' 경로의 값을 가져옵니다.

            const sMsg = oBundle.getText("helloMsg", [sRecipient]);
            // 'helloMsg' 텍스트를 리소스 번들에서 가져오고, 'sRecipient' 값을 포함시켜 메시지를 생성합니다.

            // 생성된 메시지를 화면에 표시합니다.
            MessageToast.show(sMsg);
        },

        async onOpenDialog() {
            // 'onOpenDialog' 메서드는 대화상자를 열기 위한 비동기 메서드입니다.

            // 대화상자를 지연 로드(lazy loading)하여 필요할 때만 생성합니다.
            this.oDialog ??= await this.loadFragment({
                name: "ui5.walkthrough.view.HelloDialog"
            });
            // 'oDialog'가 정의되어 있지 않으면, 'ui5.walkthrough.view.HelloDialog'라는 이름의 XML 프래그먼트를 로드하고,
            // 이를 'oDialog'에 저장합니다. 'await'를 사용하여 비동기 작업이 완료될 때까지 기다립니다.

            this.oDialog.open();
            // 대화상자를 엽니다.
        },

        onCloseDialog() {
            // 'onCloseDialog' 메서드는 대화상자를 닫기 위한 메서드입니다.
            // 이 메서드는 대화상자 내부에서 호출됩니다.

            // 현재 뷰에서 ID가 'helloDialog'인 컨트롤을 찾아서 닫습니다.
            this.byId("helloDialog").close();
            // 주의: 이 이벤트 핸들러는 대화상자 내부에서 호출되므로, 대화상자 프래그먼트를 로드한 후에
            // 'pDialog'의 Promise를 체이닝할 필요는 없습니다.
        }
    });
});


```

요약
sap.ui.define: 필요한 모듈을 정의하고 Controller를 확장하여 새로운 HelloPanel 컨트롤러를 생성합니다.
Controller: SAPUI5의 기본 컨트롤러 클래스를 사용합니다.
MessageToast: 사용자에게 메시지를 표시하는 데 사용됩니다.
onShowHello() 메서드는 i18n 모델에서 메시지를 읽어와 사용자에게 표시합니다. onOpenDialog() 메서드는 대화상자를 비동기적으로 로드하고 열며, onCloseDialog() 메서드는 현재 뷰에서 ID가 'helloDialog'인 대화상자를 닫습니다

```