sap.ui.define([
	// "sap/ui/core/mvc/Controller",
	"sap/ui/core/ComponentContainer"
], (ComponentContainer) => {
	"use strict";

	// XMLView.create({
	// 	viewName: "ui5.walkthrough.view.App"
	// }).then((oView) => oView.placeAt("content"));
	// 위의 주석 처리된 코드는 XMLView를 비동기적으로 생성하고, 생성된 뷰를 "content" ID를 가진 HTML 요소에 배치하는 코드입니다.

	new ComponentContainer({
		// 새로운 ComponentContainer 인스턴스를 생성합니다.
		name: "ui5.walkthrough", // 로드할 SAPUI5 컴포넌트의 이름을 설정합니다.
		settings : {
			id : "walkthrough" // 컴포넌트에 대한 ID를 설정합니다.
		},
		async: true // 컴포넌트를 비동기적으로 로드합니다.
	}).placeAt("content"); // 생성된 컴포넌트를 HTML 문서의 "content" ID를 가진 요소에 배치합니다.
});

// 주석의 의미:
// sap.ui.define([...], (ComponentContainer) => { ... }):

// sap.ui.define은 SAPUI5의 모듈 로딩 메커니즘으로, 이 모듈이 의존하는 다른 모듈들을 로드하고 콜백 함수를 실행합니다.
// ComponentContainer 모듈을 의존성으로 선언합니다.
// "use strict";:

// 자바스크립트의 엄격 모드를 활성화합니다. 이는 오류를 발생시키거나, 더 안전한 코드 작성을 돕기 위한 것입니다.
// new ComponentContainer({ ... }).placeAt("content");:

// ComponentContainer는 SAPUI5에서 컴포넌트를 호스팅하기 위한 컨테이너입니다.
// name: "ui5.walkthrough": 로드할 컴포넌트의 이름을 지정합니다. 이 이름은 Component의 정의와 일치해야 합니다.
// settings: { id: "walkthrough" }: 컴포넌트의 설정을 정의합니다. 여기서는 컴포넌트의 ID를 "walkthrough"로 설정합니다.
// async: true: 비동기적으로 컴포넌트를 로드합니다. 이는 초기 로딩 성능을 개선하는 데 도움을 줄 수 있습니다.
// placeAt("content"): 생성된 ComponentContainer를 HTML 문서의 id가 "content"인 요소에 배치합니다.
// 이 코드는 SAPUI5 컴포넌트를 비동기적으로 로드하고, 해당 컴포넌트를 HTML 문서의 특정 위치에 렌더링하기 위한 설정을 포함하고 있습니다. 주석 처리된 XMLView 관련 코드는 이와 유사한 기능을 수행하지만, XMLView를 직접 생성하여 HTML에 배치하는 방식입니다.