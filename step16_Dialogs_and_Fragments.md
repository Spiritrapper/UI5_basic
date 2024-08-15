프래그먼트(Fragments)는 가벼운 UI 부분(UI 서브트리)으로, 재사용이 가능하며 컨트롤러가 필요하지 않습니다. 이는 특정 UI의 일부를 여러 뷰에서 재사용하고 싶거나, 특정 상황(예: 다른 사용자 역할, 편집 모드 vs 읽기 전용 모드)에 따라 뷰의 일부를 서로 교체하려고 할 때, 프래그먼트가 특히 유용하다는 것을 의미합니다. 특히 추가적인 컨트롤러 로직이 필요하지 않은 경우에 더욱 그렇습니다.

프래그먼트는 1개 이상의 컨트롤로 구성될 수 있습니다. 런타임 시, 뷰에 배치된 프래그먼트는 "일반" 뷰 콘텐츠와 유사하게 동작하며, 프래그먼트 내부의 컨트롤은 렌더링 시 뷰의 DOM에 포함됩니다. 물론, 예를 들어 다이얼로그(dialogs)와 같이 뷰의 일부로 설계되지 않은 컨트롤도 있지만, 이러한 컨트롤조차도 프래그먼트를 사용하면 매우 유용할 수 있습니다. 곧 이점에 대해 설명하겠습니다.

이제 앱에 다이얼로그를 추가할 것입니다. 다이얼로그는 특수한 경우로, 일반 앱 콘텐츠 위에 열리므로 특정 뷰에 속하지 않습니다. 따라서 다이얼로그는 컨트롤러 코드 어딘가에서 인스턴스화되어야 하지만, 선언적인 접근 방식을 유지하고 가능한 한 유연하게 재사용 가능한 아티팩트를 만들기 위해, 다이얼로그를 포함하는 XML 프래그먼트를 생성할 것입니다. 다이얼로그는 결국 앱의 여러 뷰에서 사용할 수 있습니다.


### 한국어 해석

#### 미리보기
그래픽에는 설명 텍스트가 포함되어 있습니다.
새로운 "Say Hello With Dialog" 버튼을 클릭하면 대화 상자가 열립니다.

#### 코드
다음은 Walkthrough - Step 16에서 필요한 파일 설정입니다.

##### webapp/view/HelloPanel.view.xml
```xml
<mvc:View
   controllerName="ui5.walkthrough.controller.HelloPanel"
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <Panel
      headerText="{i18n>helloPanelTitle}"
      class="sapUiResponsiveMargin"
      width="auto" >
      <content>
         <Button
            id="helloDialogButton"
            text="{i18n>openDialogButtonText}"
            press=".onOpenDialog"
            class="sapUiSmallMarginEnd"/>
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
- 뷰에 대화 상자를 여는 새로운 버튼을 추가했습니다. 이 버튼은 패널의 콘텐츠 뷰 컨트롤러에 있는 이벤트 핸들러 함수를 호출합니다. 새로운 `id="helloDialogButton"`은 나중에 OPA와 통합 테스트를 할 때 필요합니다.
- 앱의 주요 컨트롤에 고유한 ID를 설정하는 것이 좋은 습관입니다. 그렇지 않으면 OpenUI5 런타임이 자동으로 고유하지만 변하는 ID를 생성합니다. 브라우저에서 앱의 DOM 요소를 검사하여 차이를 확인할 수 있습니다.

##### webapp/view/HelloDialog.fragment.xml (새 파일)
```xml
<core:FragmentDefinition
   xmlns="sap.m"
   xmlns:core="sap.ui.core">
   <Dialog
      id="helloDialog"
      title="Hello {/recipient/name}"/>
</core:FragmentDefinition>
```
- 대화 상자를 선언적으로 정의하기 위해 새 XML 파일을 추가했습니다. 프래그먼트 자산은 core 네임스페이스에 있으므로 `FragmentDefinition` 태그 안에 XML 네임스페이스를 추가합니다.
- 구문은 뷰와 유사하지만, 프래그먼트에는 컨트롤러가 없기 때문에 이 속성이 없습니다. 또한, 프래그먼트 자체는 앱의 DOM 트리에 발자국이 없으며, 프래그먼트 자체의 컨트롤 인스턴스도 없습니다. 이는 재사용 가능한 컨트롤 세트를 위한 단순한 컨테이너입니다.

##### webapp/controller/HelloPanel.controller.js
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
        },

        async onOpenDialog() {
            // 대화 상자를 지연 로드 방식으로 생성
            this.oDialog ??= await this.loadFragment({
                name: "ui5.walkthrough.view.HelloDialog"
            });
        
            this.oDialog.open();
        }
    });
});
```
- `async/await`를 사용하여 이벤트가 발생할 때마다 대화 상자를 비동기적으로 처리합니다.
- 대화 상자 프래그먼트가 아직 존재하지 않는 경우, `loadFragment` API를 호출하여 프래그먼트를 인스턴스화합니다. 그런 다음 이 대화 상자를 컨트롤러 인스턴스에 저장합니다. 이를 통해 이벤트가 발생할 때마다 대화 상자를 재사용할 수 있습니다.
- 팁: 대화 상자 열기 및 닫기 기능을 다른 컨트롤러에서 재사용하려면 `ui5.walkthrough.controller.BaseController`라는 새 파일을 만들어 모든 대화 상자 관련 코딩을 이 컨트롤러에 넣을 수 있습니다. 이제 다른 컨트롤러는 `sap.ui.core.mvc.Controller` 대신 이 컨트롤러에서 확장할 수 있습니다.

##### webapp/i18n/i18n.properties
```
# App Descriptor
appTitle=Hello World
appDescription=A simple walkthrough app that explains the most important concepts of SAPUI5

# Hello Panel
showHelloButtonText=Say Hello
helloMsg=Hello {0}
homePageTitle=Walkthrough
helloPanelTitle=Hello World
openDialogButtonText=Say Hello With Dialog
```
- 열기 버튼에 대한 새로운 텍스트를 번들에 추가했습니다.