### 설명

**웹앱 폴더 및 파일 생성**

**webapp/i18n/i18n.properties** (새 파일)

```properties
showHelloButtonText=Say Hello
helloMsg=Hello {0}
```

- **i18n 폴더 생성**: `webapp/i18n` 폴더와 `i18n.properties` 파일을 새로 생성합니다. 이 파일은 각 요소에 대한 이름-값 쌍을 포함합니다. 중괄호 `{0}`는 파라미터의 순서를 나타내며, 실제 값으로 대체됩니다.

- **다국어 지원**: 실제 프로젝트에서는 각 지원 언어에 대해 별도의 파일을 생성합니다. 예를 들어, 독일어는 `i18n_de.properties`, 영어는 `i18n_en.properties`와 같은 방식입니다. 사용자 환경에 맞는 언어 파일이 자동으로 로드됩니다.

**controller/App.controller.js**

```javascript
sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel"
], (Controller, MessageToast, JSONModel, ResourceModel) => {
   "use strict";

   return Controller.extend("ui5.walkthrough.controller.App", {
     onInit() {
         // 뷰에 데이터 모델 설정
         const oData = {
            recipient : {
               name : "World"
            }
         };
         const oModel = new JSONModel(oData);
         this.getView().setModel(oModel);

         // i18n 모델을 뷰에 설정
         const i18nModel = new ResourceModel({
            bundleName: "ui5.walkthrough.i18n.i18n"
         });
         this.getView().setModel(i18nModel, "i18n");
      },

      onShowHello() {
         // i18n 모델에서 메시지 읽기
         const oBundle = this.getView().getModel("i18n").getResourceBundle();
         const sRecipient = this.getView().getModel().getProperty("/recipient/name");
         const sMsg = oBundle.getText("helloMsg", [sRecipient]);

         // 메시지 표시
         MessageToast.show(sMsg);
      }
   });
});
```

- **onInit 함수**: 이 함수에서 `ResourceModel`을 인스턴스화하여 메시지 번들 파일(i18n.properties)에 대한 경로를 지정합니다. 이 모델은 `i18n`이라는 이름으로 뷰에 설정됩니다.

- **i18n 모델 설정**: `ResourceModel`을 사용하여 `ui5.walkthrough.i18n.i18n` 번들 이름을 가진 모델을 생성하고, 이를 뷰에 `i18n`이라는 키로 설정합니다.

- **메시지 표시**: `onShowHello` 함수에서 `i18n` 모델을 사용하여 번들에서 텍스트를 읽고 `{0}` 자리 표시자를 수신자의 이름으로 대체합니다. `MessageToast.show`를 사용하여 이 메시지를 화면에 표시합니다.

**webapp/view/App.view.xml**

```xml
<mvc:View
   controllerName="ui5.walkthrough.controller.App"
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <Button
      text="{i18n>showHelloButtonText}"
      press=".onShowHello"/>
   <Input
      value="{/recipient/name}"
      description="Hello {/recipient/name}"
      valueLiveUpdate="true"
      width="60%"/>
</mvc:View>
```

- **XML 뷰에서의 데이터 바인딩**: 버튼의 텍스트를 `i18n` 모델의 `showHelloButtonText` 속성에 바인딩합니다. 자원 번들은 평면 구조를 가지므로 경로에서 선행 슬래시(`/`)를 생략할 수 있습니다.

### 요약
이 단계에서는 i18n(국제화) 파일을 사용하여 다국어 지원을 설정하는 방법을 배웁니다. SAPUI5는 언어에 맞는 자원 파일을 자동으로 로드하여 다국어 텍스트를 표시합니다. `i18n.properties` 파일을 사용하여 텍스트를 관리하고, 이 파일의 값을 컨트롤러와 XML 뷰에서 참조하여 다국어 지원을 구현합니다.

### 주의 사항

- **문자열 연결 금지**: 번역된 문자열을 수동으로 연결하는 것은 피해야 하며, 항상 자리 표시자를 사용하여 동적 데이터를 삽입해야 합니다.
- **유니코드 이스케이프 시퀀스**: 특수 문자는 유니코드 이스케이프 시퀀스를 사용하여 표시합니다.
