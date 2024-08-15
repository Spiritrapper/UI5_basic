### 한국어 해석

#### 미리보기
그래픽에는 설명 텍스트가 포함되어 있습니다.
패널 콘텐츠가 이제 별도의 뷰로 리팩토링되었습니다 (이전 단계와 시각적 변화 없음).

#### 코드
다음은 Walkthrough - Step 15의 파일 설정 방법입니다.

##### webapp/view/App.view.xml
```xml
<mvc:View
	controllerName="ui5.walkthrough.controller.App"
	xmlns="sap.m"
	xmlns:mvc="sap.ui.core.mvc"
	displayBlock="true">
	<Shell>
		<App class="myAppDemoWT">
			<pages>
				<Page title="{i18n>homePageTitle}">
					<content>
						<mvc:XMLView viewName="ui5.walkthrough.view.HelloPanel"/>
					</content>
				</Page>
			</pages>
		</App>
	</Shell>
</mvc:View>
```
- 패널과 그 콘텐츠를 `App` 뷰에 직접 넣는 대신, 새로운 `HelloPanel` 뷰로 이동합니다. 이를 `XMLView` 태그를 사용하여 참조합니다.

##### webapp/view/HelloPanel.view.xml (새 파일)
```xml
<mvc:View
   controllerName="ui5.walkthrough.controller.HelloPanel"
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <Panel
      headerText="{i18n>helloPanelTitle}"
      class="sapUiResponsiveMargin"
      width="auto">
      <content>
         <Button
            text="{i18n>showHelloButtonText}"
            press=".onShowHello"
            class="myCustomButton"/>
         <Input
            value="{/recipient/name}"
            valueLiveUpdate="true"
            width="60%"/>
         <FormattedText
            htmlText="Hello {/recipient/name}"
            class="sapUiSmallMargin sapThemeHighlight-asColor myCustomText"/>
      </content>
   </Panel>
</mvc:View>
```
- 패널의 전체 콘텐츠가 이제 `HelloPanel.view.xml`이라는 새로운 파일에 추가되었습니다. XML 뷰의 `controllerName` 속성을 설정하여 해당 뷰의 컨트롤러를 지정합니다.

##### webapp/controller/HelloPanel.controller.js (새 파일)
```javascript
sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast"
], (Controller, MessageToast) => {
   "use strict";

   return Controller.extend("ui5.walkthrough.controller.HelloPanel", {
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
- `onShowHello` 메서드를 `HelloPanel` 컨트롤러로 이동하여 재사용 가능한 자산으로 만듭니다. 이 메서드는 이제 `App` 컨트롤러에서 `HelloPanel` 컨트롤러로 이동했습니다.

##### webapp/controller/App.controller.js
```javascript
sap.ui.define([
   "sap/ui/core/mvc/Controller"
], (Controller) => {
   "use strict";

   return Controller.extend("ui5.walkthrough.controller.App", {
   });
});
```
- 이제 모든 내용이 `App` 뷰와 컨트롤러에서 제거되었습니다. `App` 컨트롤러는 현재 빈 상태로 남아 있으며, 나중에 더 많은 기능을 추가할 때 사용될 수 있습니다.