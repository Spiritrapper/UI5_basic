### 한국어 해석

이제 다이얼로그에 "OK" 버튼이 추가되었습니다.

#### 코딩
Walkthrough - Step 17에서 모든 파일을 볼 수 있고 다운로드할 수 있습니다.

#### `webapp/controller/HelloPanel.controller.js`

```javascript
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], (Controller, MessageToast) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.HelloPanel", {
		onShowHello() {
			// i18n 모델에서 메시지를 읽어옵니다.
			const oBundle = this.getView().getModel("i18n").getResourceBundle();
			const sRecipient = this.getView().getModel().getProperty("/recipient/name");
			const sMsg = oBundle.getText("helloMsg", [sRecipient]);

			// 메시지를 보여줍니다.
			MessageToast.show(sMsg);
		},

		async onOpenDialog() {
			// 다이얼로그를 지연 생성합니다.
			this.oDialog ??= await this.loadFragment({
				name: "ui5.walkthrough.view.HelloDialog"
			});

			this.oDialog.open();
		},

		onCloseDialog() {
			// 주의: 이 이벤트 핸들러는 로드된 다이얼로그에서만 호출되므로 pDialog promise에 체이닝할 필요가 없습니다.
			this.byId("helloDialog").close();
		}
	});

});
```

이 이벤트 핸들러 함수는 같은 컨트롤러 파일에 추가되었으며, `byId` 함수를 사용하여 다이얼로그 인스턴스를 가져와 `close` 함수를 호출하여 다이얼로그를 닫습니다.

#### `webapp/view/HelloDialog.fragment.xml`

```xml
<core:FragmentDefinition
   xmlns="sap.m"
   xmlns:core="sap.ui.core">
   <Dialog
      id="helloDialog"
      title ="Hello {/recipient/name}">
      <beginButton>
         <Button
            text="{i18n>dialogCloseButtonText}"
            press=".onCloseDialog"/>
      </beginButton>
   </Dialog>
</core:FragmentDefinition>
```

프래그먼트 정의에서 다이얼로그의 `beginButton` 어그리게이션에 버튼을 추가합니다. `press` 핸들러는 `.onCloseDialog`라는 이벤트 핸들러를 참조합니다. 버튼이 눌리면 이 메서드가 호출됩니다. 다이얼로그는 `beginButton`과 `endButton`이라는 두 가지 어그리게이션을 가지고 있으며, 이 두 위치에 버튼을 배치하면 UI에서 `beginButton`이 `endButton`보다 먼저 위치하게 됩니다. "먼저"가 의미하는 바는 현재 언어의 텍스트 방향에 따라 달라지며, 우리는 이 용어들을 "왼쪽"과 "오른쪽"의 동의어로 사용합니다. 좌-우 방향 언어에서는 `beginButton`이 다이얼로그 하단의 왼쪽에, `endButton`이 오른쪽에 렌더링되고, 특정 언어의 우-좌 모드에서는 순서가 바뀝니다.

#### `webapp/i18n/i18n.properties`

```properties
# App Descriptor
appTitle=Hello World
appDescription=A simple walkthrough app that explains the most important concepts of SAPUI5

# Hello Panel
showHelloButtonText=Say Hello
helloMsg=Hello {0}
homePageTitle=Walkthrough
helloPanelTitle=Hello World
openDialogButtonText=Say Hello With Dialog
dialogCloseButtonText=Ok
```

텍스트 번들은 다이얼로그 닫기 버튼을 위한 새 텍스트로 확장됩니다.