### 한국어 해석

### **패널 아래에 청구서 목록이 표시됩니다**

**코딩**

Walkthrough - Step 19에서 모든 파일을 볼 수 있고 다운로드할 수 있습니다.

#### `webapp/Invoices.json` (새 파일)

```json
{
    "Invoices": [
        {
            "ProductName": "Pineapple",
            "Quantity": 21,
            "ExtendedPrice": 87.2,
            "ShipperName": "Fun Inc.",
            "ShippedDate": "2015-04-01T00:00:00",
            "Status": "A"
        },
        {
            "ProductName": "Milk",
            "Quantity": 4,
            "ExtendedPrice": 10,
            "ShipperName": "ACME",
            "ShippedDate": "2015-02-18T00:00:00",
            "Status": "B"
        },
        {
            "ProductName": "Canned Beans",
            "Quantity": 3,
            "ExtendedPrice": 6.85,
            "ShipperName": "ACME",
            "ShippedDate": "2015-03-02T00:00:00",
            "Status": "B"
        },
        {
            "ProductName": "Salad",
            "Quantity": 2,
            "ExtendedPrice": 8.8,
            "ShipperName": "ACME",
            "ShippedDate": "2015-04-12T00:00:00",
            "Status": "C"
        },
        {
            "ProductName": "Bread",
            "Quantity": 1,
            "ExtendedPrice": 2.71,
            "ShipperName": "Fun Inc.",
            "ShippedDate": "2015-01-27T00:00:00",
            "Status": "A"
        }
    ]
}
```

`Invoices.json` 파일은 앱에서 제어 요소에 바인딩할 수 있는 5개의 청구서를 JSON 형식으로 포함하고 있습니다. JSON은 데이터를 저장하기 위한 매우 가벼운 형식이며 SAPUI5 애플리케이션의 데이터 소스로 직접 사용할 수 있습니다.

#### `webapp/manifest.json`

```json
{
  ...
  "sap.ui5": {
    ...
    "models": {
      "i18n": {
        "type": "sap.ui.model.resource.ResourceModel",
        "settings": {
          "bundleName": "ui5.walkthrough.i18n.i18n",
          "supportedLocales": [
            ""
          ],
          "fallbackLocale": ""
        }
      },
      "invoice": {
        "type": "sap.ui.model.json.JSONModel",
        "uri": "Invoices.json"
      }
    }
  }
  ...
}
```

우리는 `sap.ui5` 섹션에 새로운 모델 `invoice`를 추가합니다. 이번에는 `JSONModel`을 원하므로 `type`을 `sap.ui.model.json.JSONModel`로 설정합니다. `uri` 키는 `Invoices.json` 파일로의 상대 경로를 나타냅니다. 이 작은 구성으로, 우리의 컴포넌트는 자동으로 `Invoices.json` 파일에서 청구서 데이터를 로드하는 새로운 `JSONModel`을 인스턴스화합니다. 마지막으로, 인스턴스화된 `JSONModel`은 `invoice`라는 이름의 모델로 컴포넌트에 설정됩니다. 이 이름이 지정된 모델은 앱 전반에서 사용 가능합니다.

#### `webapp/view/App.view.xml`

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
                                <mvc:XMLView
                                    viewName="ui5.walkthrough.view.HelloPanel"/>
                                <mvc:XMLView
                                    viewName="ui5.walkthrough.view.InvoiceList"/>
                            </content>
                        </Panel>
                    </content>
                </Page>
            </pages>
        </App>
    </Shell>
</mvc:View>
```

앱 뷰에서 패널 아래에 청구서를 표시하기 위해 두 번째 뷰를 추가했습니다.

#### `webapp/view/InvoiceList.view.xml` (새 파일)

```xml
<mvc:View
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <List
      headerText="{i18n>invoiceListTitle}"
      class="sapUiResponsiveMargin"
      width="auto"
      items="{invoice>/Invoices}" >
      <items>
         <ObjectListItem
            title="{invoice>Quantity} x {invoice>ProductName}"/>
      </items>
   </List>
</mvc:View>
```

새로운 뷰는 커스텀 헤더 텍스트와 함께 리스트 컨트롤을 표시합니다. 리스트의 `item` 어그리게이션은 JSON 데이터의 루트 경로 `Invoices`에 바인딩되어 있습니다. 이름이 지정된 모델을 정의했으므로 각 바인딩 정의 앞에 `invoice` 식별자를 접두사로 붙여야 합니다.

`items` 어그리게이션에서, 우리는 테스트 데이터의 각 청구서에 대해 자동으로 반복될 리스트 템플릿을 정의합니다. 더 정확하게는, `sap/m/ObjectListItem`을 사용하여 `items` 어그리게이션의 각 자식에 대한 컨트롤을 생성합니다. 리스트 항목의 `title` 속성은 단일 청구서의 속성에 바인딩됩니다. 이는 상대 경로(앞에 `/` 없이)를 정의하여 달성됩니다. 이는 `items={invoice>/Invoices}`를 통해 `items` 어그리게이션을 청구서에 바인딩했기 때문에 작동합니다.

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

# Invoice List
invoiceListTitle=Invoices
```

텍스트 번들에 리스트의 제목이 추가되었습니다.