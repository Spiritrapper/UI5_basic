### 패널 및 내용의 레이아웃에 여백과 패딩 추가하기

#### 코드
다음은 Walkthrough - Step 13의 코드 및 파일들입니다.

##### `webapp/view/App.view.xml`
```xml
<mvc:View
	controllerName="ui5.walkthrough.controller.App"
	xmlns="sap.m"
	xmlns:mvc="sap.ui.core.mvc"
	displayBlock="true">
	<Shell>
		<App>
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
									class="sapUiSmallMarginEnd"/>
								<Input
									value="{/recipient/name}"
									valueLiveUpdate="true"
									width="60%"/>
								<Text
									text="Hello {/recipient/name}"
									class="sapUiSmallMargin"/>
							</content>
						</Panel>
					</content>
				</Page>
			</pages>
		</App>
	</Shell>
</mvc:View>
```

패널의 레이아웃을 구성하기 위해, `sapUiResponsiveMargin` CSS 클래스를 추가하여 패널 주변에 여백을 추가합니다. 패널의 너비를 `auto`로 설정해야 하는 이유는, 그렇지 않으면 여백이 기본 너비인 100%에 추가되어 페이지 크기를 초과할 수 있기 때문입니다.

화면 크기를 줄이면 여백도 줄어드는 것을 확인할 수 있습니다. 이름에서 알 수 있듯이, 여백은 반응형이며 장치의 화면 크기에 적응합니다. 예를 들어, 태블릿에서는 더 작은 여백이 적용되고, 세로 모드의 휴대전화에서는 여백이 없어서 작은 화면에서 공간을 절약할 수 있습니다.

모든 종류의 컨트롤에 여백을 추가할 수 있으며, 다양한 옵션이 제공됩니다. 버튼과 입력 필드 사이에 공간을 추가하기 위해 버튼에 `sapUiSmallMarginEnd` 클래스를 추가했습니다.

출력 텍스트를 개별적으로 형식화하기 위해, 입력 필드에서 설명을 제거하고 동일한 값을 가진 새 `Text` 컨트롤을 추가했습니다. 여기서도 다른 내용과 정렬하기 위해 작은 여백을 사용합니다. 패널과 같은 컨테이너 컨트롤의 내부 부분을 레이아웃하기 위해 표준 패딩 클래스를 추가할 수도 있지만, 패널이 기본적으로 패딩을 제공하므로 이 경우에는 필요하지 않습니다.

**규칙**
가능한 경우 표준 SAPUI5 CSS 클래스를 사용하여 레이아웃을 구성하세요.