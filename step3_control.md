여기서는 이제 "Hello World" 텍스트를 SAPUI5 컨트롤로 표시합니다.

**코딩 내용**

모든 파일은 Walkthrough - Step 3에서 확인하고 다운로드할 수 있습니다.

### `webapp/index.html`

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
		data-sap-ui-libs="sap.m"
		data-sap-ui-compat-version="edge"
		data-sap-ui-async="true"
		data-sap-ui-on-init="module:ui5/walkthrough/index"
		data-sap-ui-resource-roots='{
			"ui5.walkthrough": "./"
		}'>
	</script>
</head>
<body class="sapUiBody" id="content">
</body>
</html>
```

`sapUiBody` 클래스는 SAPUI5 앱을 표시하기 위한 테마 종속 스타일을 추가합니다.

### `webapp/index.js`

```javascript
sap.ui.define([
	"sap/m/Text"
], (Text) => {
	"use strict";

	new Text({
		text: "Hello World"
	}).placeAt("content");
});
```

여기서는 네이티브 JavaScript 대신 간단한 SAPUI5 컨트롤을 사용하여 텍스트를 표시합니다. 컨트롤은 화면의 일부를 정의하는 데 사용되는 UI 요소입니다.

위 예제에서는 `init` 이벤트의 콜백에서 SAPUI5 텍스트 컨트롤을 인스턴스화합니다. 이 컨트롤의 이름은 컨트롤 라이브러리 `sap/m/`의 네임스페이스로 접두사(`sap/m/Text`)가 붙어 있습니다. JavaScript 객체로 옵션을 생성자에 전달하여 텍스트 속성을 "Hello World"로 설정합니다.

이후 `placeAt` 메서드를 사용하여 이 컨트롤을 문서 객체 모델(DOM)의 특정 노드 또는 다른 SAPUI5 컨트롤 인스턴스에 배치합니다. `placeAt` 메서드에는 DOM 노드의 ID가 인수로 전달되며, 이 예제에서는 `body` 태그에 `content`라는 ID를 부여하여 이를 대상 노드로 사용합니다.

모든 SAPUI5 컨트롤은 설정을 위한 고정된 속성, 집합체, 그리고 연관성을 가지고 있습니다. 이러한 속성들의 설명은 SAPUI5 Demo Kit에서 찾을 수 있습니다. 또한, 각 컨트롤은 API 참조에서 확인할 수 있는 공개 함수들을 제공합니다.

**주의**  
index.html 파일에서 `<div>Hello World</div>`를 제거하는 것을 잊지 마세요.

**참고 사항**  
`sap.ui.core.Control` 또는 그 하위 클래스의 인스턴스만 독립적으로 렌더링할 수 있으며, `placeAt` 함수를 가지고 있습니다. 각 컨트롤은 `sap.ui.core.Element`를 확장하며, 이들은 컨트롤 내부에서만 렌더링될 수 있습니다. 컨트롤의 상속 계층에 대해 더 알고 싶다면 API 참조를 확인하세요. 각 컨트롤의 API 문서에서는 직접적으로 알려진 하위 클래스에 대해 설명합니다.