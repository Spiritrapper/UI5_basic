### 설명

**webapp/controller/App.controller.js**

```javascript
sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
   "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
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
      },

      onShowHello() {
         MessageToast.show("Hello World");
      }
   });
});
```

- **onInit 함수 추가**: 이 단계에서는 컨트롤러에 `onInit` 함수를 추가합니다. 이 함수는 SAPUI5의 생명주기 메소드 중 하나로, 컨트롤러가 생성될 때 프레임워크에 의해 호출됩니다. 이는 컨트롤의 생성자와 유사합니다.
  
- **JSON 모델 인스턴스화**: 함수 내부에서 JSON 모델을 인스턴스화합니다. 이 모델의 데이터는 "recipient"라는 단일 속성만 포함하고, 그 안에 "name"이라는 추가 속성을 가집니다.

- **모델 설정**: 이 모델을 XML 뷰에서 사용하기 위해, `setModel` 함수를 호출하여 새로 생성한 모델을 뷰에 전달합니다. 이제 이 모델은 뷰에 설정됩니다.

- **메시지 토스트**: 현재 메시지 토스트는 "Hello World"라는 정적 메시지만을 표시합니다. 다음 단계에서는 번역된 텍스트를 표시하는 방법을 설명합니다.

**webapp/view/App.view.xml**

```xml
<mvc:View
   controllerName="ui5.walkthrough.controller.App"
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <Button
      text="Say Hello"
      press=".onShowHello"/>
   <Input
      value="{/recipient/name}"
      description="Hello {/recipient/name}"
      valueLiveUpdate="true"
      width="60%"/>
</mvc:View>
```

- **sap/m/Input 컨트롤 추가**: 뷰에 `sap/m/Input` 컨트롤을 추가합니다. 이를 통해 사용자는 인사를 위한 수신자를 입력할 수 있습니다.

- **데이터 바인딩**: 이 입력 필드의 값을 SAPUI5 모델에 바인딩하기 위해 XML 뷰의 선언적 바인딩 문법을 사용합니다. 중괄호 `{…}`는 데이터가 수신자의 객체 속성인 `name`에서 가져온 것임을 나타냅니다. `/recipient/name`은 모델에서의 경로를 선언합니다.

### 요약
이 단계에서는 SAPUI5 모델을 사용하여 입력 필드와 데이터 바인딩을 설정하는 방법을 배웁니다. 사용자가 입력한 텍스트가 모델의 데이터와 실시간으로 동기화되어 표시됩니다.