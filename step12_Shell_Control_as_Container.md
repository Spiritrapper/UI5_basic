### 앱을 제한된 폭의 셸에서 실행하기

#### 코드
다음은 Walkthrough - Step 12의 코드 및 파일들입니다.

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
							headerText="{i18n>helloPanelTitle}">
							<content>
								<Button
									text="{i18n>showHelloButtonText}"
									press=".onShowHello"/>
								<Input
									value="{/recipient/name}"
									description="Hello {/recipient/name}"
									valueLiveUpdate="true"
									width="60%"/>
							</content>
						</Panel>
					</content>
				</Page>
			</pages>
		</App>
	</Shell>
</mvc:View>
```

이제 셸(Shell) 컨트롤이 앱의 가장 바깥쪽 컨트롤로 사용되며, 화면 크기가 특정 너비보다 클 경우 자동으로 "letterbox" 모드가 적용됩니다. 

**참고:** 앱이 SAP Fiori Launchpad와 같은 외부 셸에서 실행되는 경우, XML 뷰에서 셸 컨트롤을 추가할 필요가 없습니다. 외부 셸이 이미 컴포넌트 UI를 감싸고 있기 때문입니다.

셸을 사용자 지정할 수 있는 추가 옵션도 있습니다. 예를 들어, 사용자 지정 배경 이미지 또는 색상 설정, 사용자 지정 로고 설정 등이 가능합니다. 자세한 내용은 관련 API 참조를 확인하세요.