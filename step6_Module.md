### 설명

**webapp/controller/App.controller.js**

```javascript
sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast"
], (Controller, MessageToast) => {
   "use strict";

   return Controller.extend("ui5.walkthrough.controller.App", {
      onShowHello() {
         MessageToast.show("Hello World");
      }
   });
});
```

- **모듈 확장**: 이 코드에서는 필요한 모듈의 배열에 `sap/m/MessageToast` 경로를 추가합니다. `MessageToast` 모듈은 메시지 팝업을 표시하는 SAP UI5 컨트롤입니다.
  
- **비동기 모듈 정의(AMD) 문법**: 이 문법을 사용하면 모듈 로딩과 코드 실행을 명확하게 분리할 수 있습니다. 이렇게 하면 애플리케이션의 성능이 크게 향상됩니다. 브라우저는 코드 실행 전에 리소스가 언제, 어떻게 로드될지 결정할 수 있습니다.

- **`sap.ui.define` 함수**: 이 함수는 컨트롤러와 모든 다른 JavaScript 모듈에 대해 글로벌 네임스페이스를 정의하는 데 사용됩니다. 네임스페이스를 사용하면 애플리케이션 전체에서 객체에 접근할 수 있습니다.

- **`sap.ui.require` 함수**: 이 함수는 종속성을 비동기로 로드하는 데 사용되지만 네임스페이스를 선언하지 않습니다. 예를 들어, 다른 코드에서 호출할 필요는 없고 단지 실행만 해야 하는 코드에 사용됩니다.

- **매개변수 명명 규칙**: 모듈을 로드할 때 함수 매개변수의 이름은 네임스페이스를 제외한 아티팩트의 이름을 사용합니다. 예를 들어, `sap/m/MessageToast` 모듈을 로드할 때 함수 내부에서는 이를 `MessageToast`로 참조합니다.

### 요약
이 단계에서는 `MessageToast` 모듈을 추가하여 버튼 클릭 시 `alert` 대신 "Hello World" 메시지를 화면에 토스트 메시지로 표시합니다. 이를 통해 비동기 모듈 로딩의 중요성과 코드 성능 최적화의 기본 개념을 설명합니다.