### 한국어 해석

#### 주의사항
SAPUI5에서 생성된 HTML과 CSS는 공개 API의 일부가 아니며, 패치 및 마이너 릴리스에서 변경될 수 있습니다. 스타일을 오버라이드하려는 경우, SAPUI5가 업데이트될 때마다 수정 사항을 테스트하고 업데이트해야 합니다. 이는 SAPUI5 버전을 제어할 수 있는 경우에만 가능하며, SAP Fiori 런치패드와 같이 SAPUI5가 모든 앱에 대해 중앙에서 로드되는 환경에서는 불가능합니다. 따라서 SAP Fiori 런치패드에서 실행되는 앱은 스타일을 오버라이드하지 않는 것이 좋습니다.

#### 코드
다음은 Walkthrough - Step 14의 파일을 설정하는 방법입니다.

##### webapp/css/style.css (새 파일)
```css
html[dir="ltr"] .myAppDemoWT .myCustomButton.sapMBtn {
   margin-right: 0.125rem;
}

html[dir="rtl"] .myAppDemoWT .myCustomButton.sapMBtn {
   margin-left: 0.125rem;
}

.myAppDemoWT .myCustomText {
   display: inline-block;
   font-weight: bold;
}
```
- **`html[dir="ltr"] .myAppDemoWT .myCustomButton.sapMBtn`**: 좌에서 우로 읽는 언어(ltr) 환경에서 버튼의 오른쪽 여백을 0.125rem으로 설정합니다.
- **`html[dir="rtl"] .myAppDemoWT .myCustomButton.sapMBtn`**: 우에서 좌로 읽는 언어(rtl) 환경에서 버튼의 왼쪽 여백을 0.125rem으로 설정합니다.
- **`.myAppDemoWT .myCustomText`**: 텍스트를 굵게 하고 인라인 블록으로 표시합니다.

CSS 파일은 `css` 폴더에 위치하며, 커스텀 네임스페이스 클래스를 사용하여 스타일을 정의합니다. 이로 인해 스타일은 오직 해당 앱의 컨트롤에만 적용됩니다.

버튼의 기본 여백을 오버라이드하고 2px(또는 기본 글꼴 크기 16px에 상대적으로 계산된 0.125rem)의 여백을 추가합니다. `sapMBtn` 클래스를 사용하여 선택자를 더 구체적으로 만들었습니다.

오른쪽에서 왼쪽으로 읽는 언어(예: 아랍어)에서는 앱 표시가 반전되므로 왼쪽 여백을 설정하고 오른쪽 여백은 초기화합니다.

`myCustomText` 클래스에서는 텍스트를 굵게 만들고 인라인 블록으로 표시합니다. 색상 값은 아직 설정하지 않았으며, 이후 뷰에서 설정할 수 있습니다.

##### webapp/manifest.json
```json
{
  ...
  "sap.ui5": {
    ...	
    "rootView": {
      ...
    },
    "resources": {
      "css": [
        {
          "uri": "css/style.css"
        }
      ]
    }
  }
}
```
- **`resources`**: 앱에 대한 추가 리소스를 로드하는 섹션입니다. 여기서는 `css/style.css` 파일을 로드하여 HTML 페이지의 `<link>` 태그로 추가합니다. 브라우저가 자동으로 이 파일을 로드합니다.

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
					</content>
				</Page>
			</pages>
		</App>
	</Shell>
</mvc:View>
```
- **`<App class="myAppDemoWT">`**: 앱 컨트롤에 커스텀 네임스페이스 클래스를 적용합니다. 이 클래스는 스타일 규칙이 설정되지 않으며, CSS 규칙 정의에 사용됩니다.
- **`<Button class="myCustomButton"/>`**: 버튼에 커스텀 CSS 클래스 `myCustomButton`을 추가하여 버튼과 입력 필드 사이의 간격을 조정합니다.
- **`<FormattedText class="myCustomText"/>`**: 출력 텍스트를 강조하기 위해 `FormattedText` 컨트롤을 사용하며, 텍스트에 `myCustomText` 클래스를 추가하여 굵게 표시합니다. 또한, 테마에 따라 강조 색상이 자동으로 설정됩니다.

#### 규칙
- 색상은 커스텀 CSS에서 지정하지 말고, 표준 테마 종속 클래스들을 사용하여 설정하세요.

                                
                                
