### 설명

**폴더 구조**

이 단계가 끝나면 프로젝트 구조는 위 그림과 같아야 합니다. 이제 `Component.js` 파일을 생성하고 관련 파일을 수정할 차례입니다.

**webapp/Component.js** (새 파일)

```javascript
sap.ui.define([
   "sap/ui/core/UIComponent"
], (UIComponent) => {
   "use strict";

   return UIComponent.extend("", {
      init() {
         // 부모 클래스의 init 함수 호출
         UIComponent.prototype.init.apply(this, arguments);
      }
   });
});
```

- **`Component.js` 파일 생성**: 이 파일은 애플리케이션 설정을 포함합니다. `init` 함수는 컴포넌트가 인스턴스화될 때 SAPUI5에 의해 자동으로 호출됩니다. 이 컴포넌트는 `sap/ui/core/UIComponent` 기본 클래스를 상속받으며, 오버라이드된 `init` 메서드에서 기본 클래스의 `init` 함수를 호출하는 것이 의무입니다.

**webapp/Component.js**

```javascript
sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel"
], (UIComponent, JSONModel, ResourceModel) => {
   "use strict";

   return UIComponent.extend("ui5.walkthrough.Component", {
      metadata : {
         "interfaces": ["sap.ui.core.IAsyncContentCreation"],
         "rootView": {
            "viewName": "ui5.walkthrough.view.App",
            "type": "XML",
            "id": "app"
         }
      },

      init() {
         // 부모 클래스의 init 함수 호출
         UIComponent.prototype.init.apply(this, arguments);
         
         // 데이터 모델 설정
         const oData = {
            recipient : {
               name : "World"
            }
         };
         const oModel = new JSONModel(oData);
         this.setModel(oModel);

         // i18n 모델 설정
         const i18nModel = new ResourceModel({
            bundleName: "ui5.walkthrough.i18n.i18n"
         });
         this.setModel(i18nModel, "i18n");
      }
   });
});
```

- **메타데이터 섹션**: 이 섹션은 루트 뷰에 대한 참조를 정의합니다. 이로 인해 `index.js` 파일에서 직접 뷰를 표시하는 대신, 컴포넌트가 앱 뷰의 표시를 관리합니다. 또한 `sap.ui.core.IAsyncContentCreation` 인터페이스를 구현하여 컴포넌트를 완전히 비동기적으로 생성할 수 있도록 합니다.

- **`init` 함수**: 데이터 모델과 i18n 모델을 인스턴스화하고 설정합니다. 모델들은 컴포넌트에 직접 설정되며, 중첩된 컨트롤들은 부모 컨트롤로부터 모델을 자동으로 상속받기 때문에 뷰에서도 사용 가능합니다.

**webapp/controller/App.controller.js**

```javascript
sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast"
], (Controller, MessageToast) => {
   "use strict";

   return Controller.extend("ui5.walkthrough.controller.App", {
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

- **`onInit` 함수 삭제**: 이제 데이터 모델과 i18n 모델 설정은 컴포넌트에서 처리되므로, 컨트롤러에서 `onInit` 함수와 관련 모듈을 삭제합니다.

**webapp/index.js**

```javascript
sap.ui.define([
	"sap/ui/core/ComponentContainer"
], (ComponentContainer) => {
	"use strict";

	new ComponentContainer({
		name: "ui5.walkthrough",
		settings : {
			id : "walkthrough"
		},
		async: true
	}).placeAt("content");
});
```

- **컴포넌트 컨테이너 생성**: `index.js`에서 뷰를 직접 인스턴스화하는 대신, 컴포넌트 컨테이너를 생성하여 컴포넌트 구성에 따라 뷰를 인스턴스화합니다.

### 요약

이 단계에서는 `Component.js` 파일을 생성하여 애플리케이션의 설정을 중앙 집중화합니다. 이 파일은 애플리케이션의 루트 뷰를 관리하며, 데이터 모델과 i18n 모델을 설정합니다. `index.js` 파일에서는 `ComponentContainer`를 사용하여 컴포넌트를 로드하고 표시합니다.

### 주의 사항

- **컴포넌트 이름**: 컴포넌트는 `Component.js`라는 이름을 가집니다.
- **컴포넌트 위치**: `Component.js`와 애플리케이션의 모든 UI 자산은 `webapp` 폴더에 위치합니다.
- **`index.html` 위치**: 생산 환경에서 `index.html` 파일도 `webapp` 폴더에 위치합니다.