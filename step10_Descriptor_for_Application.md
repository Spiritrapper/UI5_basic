### SAP Fiori Launchpad와 `manifest.json` 파일

SAP Fiori Launchpad는 애플리케이션 컨테이너 역할을 하며, 로컬 HTML 파일 없이 앱을 인스턴스화합니다. 대신, `manifest.json` 파일이 파싱되고 컴포넌트가 현재 HTML 페이지에 로드됩니다. 이를 통해 여러 앱이 동일한 컨텍스트에서 표시될 수 있습니다. 각 앱은 언어 속성, 지원되는 장치 등과 같은 로컬 설정을 정의할 수 있습니다. `manifest.json` 파일을 사용하여 추가 리소스를 로드하고 i18n 리소스 번들을 인스턴스화할 수도 있습니다.

#### 미리보기
입력 필드와 입력 필드의 값을 표시하는 설명
(마지막 단계와 시각적 변경 없음)

#### 코딩
다음은 Walkthrough - Step 10의 코드 및 파일들입니다.

##### `webapp/manifest.json` (새 파일)
```json
{
  "_version": "1.58.0",
  "sap.app": {
    "id": "ui5.walkthrough",
    "i18n": "i18n/i18n.properties",
    "title": "{{appTitle}}",
    "description": "{{appDescription}}",
    "type": "application",
    "applicationVersion": {
      "version": "1.0.0"
    }
  },
  "sap.ui": {
    "technology": "UI5",
    "deviceTypes": {
      "desktop": true,
      "tablet": true,
      "phone": true
    }
  },
  "sap.ui5": {
    "dependencies": {
      "minUI5Version": "1.108.0",
      "libs": {
        "sap.ui.core": {},
        "sap.m": {}
      }
    },
    "models": {
      "i18n": {
        "type": "sap.ui.model.resource.ResourceModel",
        "settings": {
          "bundleName": "ui5.walkthrough.i18n.i18n",
          "supportedLocales": [""],
          "fallbackLocale": ""
        }
      }
    },
    "rootView": {
      "viewName": "ui5.walkthrough.view.App",
      "type": "XML",
      "id": "app"
    }
  }
}
```

**설명:**

`manifest.json` 파일은 전역 애플리케이션 설정과 매개변수를 포함하는 JSON 형식의 구성 객체입니다. 이 파일은 애플리케이션, 컴포넌트, 라이브러리의 설명자로 불리며, 애플리케이션의 컴포넌트를 인스턴스화할 때 SAPUI5에 의해 읽힙니다. 이 파일의 세 가지 중요한 섹션은 다음과 같습니다:

1. **sap.app**
   - `id`: 애플리케이션 컴포넌트의 네임스페이스. 고유하고 70자를 초과하지 않아야 합니다.
   - `type`: 구성하려는 항목의 유형을 정의합니다. 여기서는 애플리케이션입니다.
   - `i18n`: 리소스 번들 파일의 경로를 정의합니다.
   - `title` 및 `description`: 애플리케이션의 제목과 설명을 정의합니다.
   - `applicationVersion`: 애플리케이션의 버전을 정의합니다.

2. **sap.ui**
   - `technology`: UI 기술을 지정합니다. 여기서는 SAPUI5입니다.
   - `deviceTypes`: 애플리케이션이 지원하는 장치 유형을 정의합니다 (데스크탑, 태블릿, 폰).

3. **sap.ui5**
   - `rootView`: 이 매개변수를 지정하면 컴포넌트가 자동으로 뷰를 인스턴스화하여 루트로 사용합니다.
   - `dependencies`: 애플리케이션에서 사용하는 UI 라이브러리를 선언합니다.
   - `models`: 애플리케이션 시작 시 자동으로 인스턴스화되는 모델을 정의합니다. 여기서는 `i18n` 모델을 정의합니다.

##### `webapp/index.html`
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>UI5 Walkthrough</title>
  <script
    id="sap-ui-bootstrap"
    src="resources/sap-ui-core.js"
    data-sap-ui-theme="sap_horizon"
    data-sap-ui-compat-version="edge"
    data-sap-ui-async="true"
    data-sap-ui-on-init="module:sap/ui/core/ComponentSupport"
    data-sap-ui-resource-roots='{
      "ui5.walkthrough": "./"
    }'>
  </script>
</head>
<body class="sapUiBody" id="content">
  <div data-sap-ui-component data-name="ui5.walkthrough" data-id="container" data-settings='{"id" : "walkthrough"}'></div>
</body>
</html>
```

이제 `index.html` 파일의 본문에서 컴포넌트를 선언합니다. 부트스트랩 스크립트에서 `ComponentSupport` 모듈을 활성화합니다. 본문에서 `div` 태그를 사용하여 컴포넌트를 선언하면, `onInit` 이벤트가 실행될 때 컴포넌트가 인스턴스화됩니다. 이제 `index.js` 파일은 삭제할 수 있습니다. `manifest.json`이 모든 것을 처리하기 때문입니다.

##### `webapp/i18n/i18n.properties`
```properties
# App Descriptor
appTitle=Hello World
appDescription=A simple walkthrough app that explains the most important concepts of SAPUI5

# Hello Panel
showHelloButtonText=Say Hello
helloMsg=Hello {0}
```

리소스 번들에는 앱의 제목과 설명 텍스트를 추가하고, 번들 텍스트를 의미별로 구분합니다.

##### `webapp/Component.js`
```javascript
sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel"
], (UIComponent, JSONModel) => {
   "use strict";

   return UIComponent.extend("ui5.walkthrough.Component", {
      metadata : {
         interfaces: ["sap.ui.core.IAsyncContentCreation"],
         manifest: "json"
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
      }
   });
});
```

컴포넌트의 메타데이터 섹션에서 `rootView` 속성을 `manifest` 속성으로 대체합니다. 이 속성은 컴포넌트가 자동으로 로드되고 파싱될 때 참조할 설명서를 정의합니다. 이제 리소스 번들 모델 인스턴스화에 대한 코드 라인은 완전히 제거됩니다. `Component.js` 파일 내에서 SAPUI5가 자동으로 처리합니다. `sap/ui/model/resource/ResourceModel` 의존성 및 관련 코드도 제거됩니다.

**팁:** 이전 SAPUI5 버전에서는 앱의 서비스 구성, 루트 뷰, 라우팅 구성 등의 추가 설정을 `Component.js` 파일의 메타데이터 섹션에 추가해야 했습니다. SAPUI5 버전 1.30부터는 이러한 설정을 `manifest.json` 설명서 파일에 정의하는 것이 권장됩니다.