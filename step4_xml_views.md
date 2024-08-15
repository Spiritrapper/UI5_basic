여기서는 "Hello World" 텍스트가 SAPUI5 컨트롤을 통해 표시됩니다. (이전 단계와 시각적으로는 변화가 없습니다.)

**코딩 내용**

모든 파일은 Walkthrough - Step 4에서 확인하고 다운로드할 수 있습니다.

### `webapp/view/App.view.xml` (새 파일)

```xml
<mvc:View
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
</mvc:View>
```

우리는 `webapp` 폴더에 새로운 `view` 폴더를 만들고, 그 안에 `App.view.xml`이라는 새로운 파일을 생성합니다. XML 구조의 루트 노드는 `View`입니다. 여기서, 우리의 UI 자산 대부분이 위치한 기본 네임스페이스인 `sap.m`을 참조합니다. 또한, SAPUI5의 뷰 및 기타 Model-View-Controller (MVC) 자산이 위치한 `sap.ui.core.mvc` 네임스페이스를 `mvc`라는 별칭으로 정의합니다.

**주의 사항**  
네임스페이스는 프로젝트의 모든 리소스를 식별하며, 고유해야 합니다. 만약 여러분이 애플리케이션 코드나 컨트롤을 직접 개발한다면, `sap` 접두사가 붙은 네임스페이스는 사용할 수 없습니다. 이 네임스페이스는 SAP 리소스를 위해 예약되어 있기 때문입니다. 대신, 고유한 네임스페이스를 정의하세요 (예: `myCompany.myApp`).

### `webapp/view/App.view.xml`

```xml
<mvc:View
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <Text text="Hello World"/>
</mvc:View>
```

`View` 태그 안에 이전 단계에서 사용했던 텍스트 컨트롤을 선언적 방식으로 정의합니다. XML 태그는 컨트롤로 매핑되고, 속성은 컨트롤의 속성에 매핑됩니다.

### `webapp/index.js`

```javascript
sap.ui.define([
	"sap/ui/core/mvc/XMLView"
], (XMLView) => {
	"use strict";

	XMLView.create({
		viewName: "ui5.walkthrough.view.App"
	}).then((oView) => oView.placeAt("content"));
});
```

여기서는 `sap/m/Text` 컨트롤의 인스턴스화를 새로 만든 `App.view.xml` 파일로 대체합니다. 뷰는 SAPUI5의 팩토리 함수에 의해 생성됩니다. 이 뷰의 이름은 `ui5.walkthrough.view` 네임스페이스로 접두사를 붙여 고유하게 식별합니다.

**관례 사항**
- 뷰 이름은 대문자로 시작합니다.
- 모든 뷰는 `view` 폴더에 저장됩니다.
- XML 뷰의 이름은 항상 `*.view.xml`로 끝납니다.
- 기본 XML 네임스페이스는 `sap.m`입니다.
- 다른 XML 네임스페이스는 SAP 네임스페이스의 마지막 부분을 별칭으로 사용합니다 (예: `sap.ui.core.mvc`는 `mvc`로 사용).

==========================================================================================

이 JavaScript 코드는 SAP UI5 애플리케이션에서 사용되는 모듈을 정의하고 로드하기 위해 사용되는 `sap.ui.define` 함수를 활용한 코드입니다. 이 구조를 단계별로 설명하겠습니다.

### 1. **`sap.ui.define` 함수**

```javascript
sap.ui.define([
	"sap/ui/core/mvc/XMLView"
], (XMLView) => {
```

- **`sap.ui.define`**: 이 함수는 모듈을 정의하고 해당 모듈이 의존하는 다른 모듈들을 로드하는 데 사용됩니다. 여기서는 SAP UI5의 기본 모듈 로딩 메커니즘을 사용합니다.
- **의존성 배열**: 첫 번째 인수는 문자열 배열로, 로드해야 할 모듈의 이름을 지정합니다. 이 코드에서는 `"sap/ui/core/mvc/XMLView"`라는 모듈을 로드합니다. 이 모듈은 XML로 정의된 SAP UI5 뷰를 생성하기 위한 것입니다.
- **콜백 함수**: 두 번째 인수는 콜백 함수로, 앞에서 로드된 모듈을 사용하여 실행할 코드가 포함됩니다. 이 함수는 의존성 배열에서 지정된 모듈들을 인수로 받습니다. 여기서는 `XMLView`라는 인수로 전달됩니다.

### 2. **`XMLView.create`**

```javascript
XMLView.create({
	viewName: "ui5.walkthrough.view.App"
})
```

- **`XMLView.create`**: 이 함수는 SAP UI5에서 XML로 정의된 뷰를 동적으로 생성하기 위한 팩토리 메서드입니다. 이 메서드는 `Promise` 객체를 반환합니다.
- **`viewName` 속성**: `viewName`은 생성할 뷰의 이름을 지정합니다. 여기서는 `ui5.walkthrough.view.App`이라는 XML 뷰를 생성합니다. 이 이름은 뷰 파일의 경로와 일치해야 합니다.

### 3. **`then` 메서드**

```javascript
.then((oView) => oView.placeAt("content"));
```

- **`then`**: `XMLView.create` 메서드가 반환하는 `Promise` 객체의 메서드입니다. XML 뷰가 성공적으로 생성된 후 호출됩니다.
- **`oView` 인수**: `then` 메서드의 콜백 함수는 생성된 뷰 객체를 인수(`oView`)로 받습니다.
- **`oView.placeAt`**: 이 메서드는 생성된 뷰(`oView`)를 특정 DOM 노드(HTML 요소)에 배치하는 데 사용됩니다. 이 코드에서는 `"content"`라는 ID를 가진 DOM 요소에 뷰를 배치합니다. 이 ID는 보통 `index.html` 파일에 정의되어 있습니다.

### 요약

- **모듈 로드 및 정의**: `sap.ui.define`을 통해 `XMLView` 모듈을 로드하고 사용할 수 있습니다.
- **뷰 생성**: `XMLView.create`를 통해 XML 뷰를 동적으로 생성합니다.
- **뷰 배치**: 생성된 뷰를 `placeAt` 메서드를 사용하여 지정된 DOM 요소에 배치합니다. 

이 구조는 SAP UI5 애플리케이션의 모듈 기반 개발 방식의 기초를 보여줍니다.