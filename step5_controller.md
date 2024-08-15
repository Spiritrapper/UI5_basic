이 단계에서는 "Say Hello" 버튼이 추가됩니다.

### 설명

**webapp/view/App.view.xml**

```xml
<mvc:View
   controllerName="ui5.walkthrough.controller.App"
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <Button
      text="Say Hello"
      press=".onShowHello"/>
</mvc:View>
```

- 우리는 컨트롤러에 대한 참조를 추가하고, 텍스트 컨트롤을 "Say Hello"라는 텍스트를 가진 버튼으로 교체합니다. 이 버튼은 눌렸을 때 `.onShowHello` 이벤트 핸들러 함수를 호출합니다.
- 뷰에 연결된 컨트롤러의 이름을 지정하기 위해 `controllerName` 속성을 설정해야 합니다. 이 컨트롤러는 `.onShowHello` 함수를 포함하고 있어야 합니다.
- `controllerName`은 애플리케이션의 네임스페이스와 컨트롤러의 실제 이름을 결합한 것입니다. 다음 단계에서는 이 컨트롤러를 정의할 때도 사용됩니다.
- 뷰는 명시적으로 컨트롤러가 할당될 필요는 없습니다. 뷰가 단순히 정보를 표시하고 추가 기능이 필요하지 않은 경우 컨트롤러를 생성할 필요가 없습니다. 그러나 컨트롤러가 지정된 경우, 뷰가 로드된 후 컨트롤러가 인스턴스화됩니다.

**webapp/controller/App.controller.js (새 파일)**

```javascript
sap.ui.define([
   "sap/ui/core/mvc/Controller"
], (Controller) => {
   "use strict";

   return Controller.extend("ui5.walkthrough.controller.App", {
      onShowHello() {
         // 기본 자바스크립트 alert 창을 표시합니다
         alert("Hello World");
      }
   });
});
```

- `webapp/controller` 폴더를 생성하고 그 안에 `App.controller.js`라는 새 파일을 만듭니다.
- 우리는 UI5에서 제공하는 `sap/ui/core/mvc/Controller`를 확장하여 애플리케이션 컨트롤러를 정의합니다.
- 초기에는 버튼의 `press` 이벤트를 처리하는 `onShowHello`라는 단일 함수만 포함됩니다. 이 함수는 "Hello World"라는 메시지를 표시하는 기본 자바스크립트 `alert` 창을 띄웁니다.

### 관례

- 컨트롤러 이름은 대문자로 시작합니다.
- 컨트롤러는 관련 뷰와 동일한 이름을 가집니다(1:1 관계가 있는 경우).
- 이벤트 핸들러는 `on`이라는 접두사를 가집니다.
- 컨트롤러 이름은 항상 `*.controller.js`로 끝납니다.

=======================================================================================

이 XML 코드는 SAP UI5 애플리케이션에서 사용하는 `View`를 정의하고 있습니다. 여기서는 `Button` 컨트롤을 추가하고, 버튼이 눌렸을 때 호출될 이벤트 핸들러를 지정하고 있습니다. 이 구조를 단계별로 설명하겠습니다.

### 1. **`<mvc:View>` 태그**

```xml
<mvc:View
   controllerName="ui5.walkthrough.controller.App"
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
```

- **`<mvc:View>`**: 이 태그는 SAP UI5의 View를 정의하는 루트 태그입니다. 여기서 View는 MVC(Model-View-Controller) 패턴에서 화면 요소를 정의하는 역할을 합니다.
  
- **`controllerName` 속성**: 이 속성은 View와 연결될 컨트롤러의 이름을 지정합니다. 여기서는 `ui5.walkthrough.controller.App`이라는 컨트롤러가 연결됩니다. 이 컨트롤러 파일에는 이 뷰와 관련된 로직(예: 이벤트 처리 함수)이 정의되어 있습니다.

- **`xmlns="sap.m"`**: 이 속성은 XML 네임스페이스를 정의하며, 여기서는 `sap.m` 라이브러리를 기본 네임스페이스로 설정합니다. 이 네임스페이스는 SAP UI5의 모바일 중심 컨트롤을 포함하고 있습니다. View 내에서 정의된 태그들은 기본적으로 이 네임스페이스에 속하는 컨트롤들로 간주됩니다.

- **`xmlns:mvc="sap.ui.core.mvc"`**: 이 속성은 `sap.ui.core.mvc` 네임스페이스를 `mvc`라는 별칭으로 정의합니다. `mvc:View`와 같이 사용할 수 있습니다. 이 네임스페이스는 MVC 패턴에서 사용하는 SAP UI5의 코어 기능을 제공합니다.

### 2. **`<Button>` 태그**

```xml
<Button
   text="Say Hello"
   press=".onShowHello"/>
```

- **`<Button>`**: SAP UI5의 `sap.m` 라이브러리에 속하는 버튼 컨트롤입니다. 이 버튼은 화면에 렌더링되어 사용자와 상호작용할 수 있습니다.
  
- **`text` 속성**: 버튼에 표시될 텍스트를 지정합니다. 여기서는 `"Say Hello"`라는 텍스트가 버튼에 표시됩니다.

- **`press` 속성**: 이 속성은 버튼이 클릭되었을 때 호출될 이벤트 핸들러를 지정합니다. 여기서는 `.onShowHello`라는 함수가 호출됩니다. 이 함수는 연결된 컨트롤러(`ui5.walkthrough.controller.App`)에 정의되어 있어야 합니다. `.` 표시는 현재 컨트롤러 내에 있는 메서드를 참조한다는 의미입니다.

### 요약

- **View 정의**: `<mvc:View>` 태그를 사용하여 View를 정의하고, 이를 특정 컨트롤러(`controllerName` 속성)와 연결합니다.
- **Button 컨트롤**: `<Button>` 태그를 사용하여 화면에 버튼을 추가하고, 버튼의 텍스트(`text`)와 클릭 이벤트(`press`)를 설정합니다.
- **이벤트 핸들러**: `press` 속성을 통해 버튼 클릭 시 호출될 함수를 지정합니다. 이 함수는 View와 연결된 컨트롤러에서 정의됩니다.

이 구조는 SAP UI5 애플리케이션에서 View와 Controller가 어떻게 연동되는지, 그리고 UI 컨트롤을 어떻게 정의하고 이벤트를 처리하는지를 보여줍니다.