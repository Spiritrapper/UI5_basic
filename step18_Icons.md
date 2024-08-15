### 한국어 해석

이제 다이얼로그 박스에 아이콘이 표시됩니다.

#### 코딩
Walkthrough - Step 18에서 모든 파일을 볼 수 있고 다운로드할 수 있습니다.

#### `webapp/view/HelloPanel.view.xml`

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
            icon="sap-icon://world"
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

다이얼로그를 여는 버튼에 아이콘을 추가했습니다. `sap-icon://` 프로토콜은 아이콘 폰트에서 아이콘을 로드해야 한다는 것을 나타냅니다. `world`라는 식별자는 아이콘 폰트에서 읽을 수 있는 아이콘의 이름입니다.

**팁:**  
다른 아이콘은 Icon Explorer 도구를 사용하여 찾을 수 있습니다.

어떤 아이콘이든 호출하려면 Icon Explorer에 나열된 이름을 사용하여 `sap-icon://<iconname>` 형식으로 사용하세요.

#### `webapp/view/HelloDialog.fragment.xml`

```xml
<core:FragmentDefinition
   xmlns="sap.m"
   xmlns:core="sap.ui.core" >
   <Dialog
      id="helloDialog"
      title ="Hello {/recipient/name}">
      <content>
         <core:Icon
            src="sap-icon://hello-world"
            size="8rem"
            class="sapUiMediumMargin"/>
      </content>
      <beginButton>
         <Button
            text="{i18n>dialogCloseButtonText}"
            press=".onCloseDialog"/>
      </beginButton>
   </Dialog>
</core:FragmentDefinition>
```

다이얼로그 프래그먼트에서 다이얼로그의 `content` 어그리게이션에 아이콘 컨트롤을 추가했습니다. 다행히도 아이콘 폰트에는 "Hello World" 아이콘이 있어 여기에 적합합니다. 우리는 또한 아이콘의 크기를 정의하고 중간 여백을 설정했습니다.

**컨벤션:**  
아이콘 폰트를 사용하는 것이 좋습니다. 아이콘 폰트는 스케일 가능하며 품질 손실이 없고(벡터 그래픽), 별도로 로드할 필요가 없습니다.