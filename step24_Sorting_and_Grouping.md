### 한글 해석

### **리스트가 이제 배송 회사별로 정렬되고 그룹화됩니다**

**코딩**

Walkthrough - Step 24에서 모든 파일을 볼 수 있고 다운로드할 수 있습니다.

#### `webapp/view/InvoiceList.view.xml`

```xml
<mvc:View
   controllerName="ui5.walkthrough.controller.InvoiceList"
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <List
      id="invoiceList"
      class="sapUiResponsiveMargin"
      width="auto"
      items="{
         path : 'invoice>/Invoices',
         sorter : {
            path : 'ProductName' 
         }
      }" >
      ...
   </List>
</mvc:View>
```

여기서 바인딩 구문에 선언적 `sorter(정렬자)`를 추가합니다. 평소와 같이 간단한 바인딩 구문을 객체 표기로 변환하고 데이터 경로를 지정한 다음, 추가로 `sorter` 속성을 추가합니다. `sorter` 속성 안에 인보이스 항목을 정렬할 데이터 경로를 지정하면, UI5가 나머지를 처리합니다. 기본적으로 정렬은 오름차순이지만, `sorter` 속성 안에 `descending` 속성을 추가하고 그 값을 `true`로 설정하여 정렬 순서를 변경할 수도 있습니다.

이제 애플리케이션을 실행하면 제품 이름으로 정렬된 인보이스 목록을 볼 수 있습니다.

#### `webapp/view/InvoiceList.view.xml`

```xml
<mvc:View
    controllerName="ui5.walkthrough.controller.InvoiceList"
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc">
    <List
        id="invoiceList"
        headerText="{i18n>invoiceListTitle}"
        class="sapUiResponsiveMargin"
        width="auto"
        items="{
            path : 'invoice>/Invoices',
            sorter : {
                path : 'ShipperName',
                group : true
            }
        }">
        ...
    </List>
</mvc:View>
```

뷰를 수정하여 다른 `sorter`를 추가하거나, 더 나아가 `sorter`를 변경하고 속성 `group`을 `true`로 설정합니다. 또한 `ShipperName` 데이터 필드의 경로를 지정합니다. 이렇게 하면 인보이스 항목이 배송 회사별로 그룹화됩니다.

`sorter`와 마찬가지로 추가적인 조치가 필요하지 않습니다. SAPUI5의 리스트 및 데이터 바인딩 기능이 자동으로 그룹 헤더를 표시하고 항목을 그룹으로 분류해줍니다. 원한다면 `groupHeaderFactory` 속성을 설정하여 사용자 정의 그룹 헤더 팩토리를 정의할 수 있지만, 기본 결과도 이미 괜찮아 보입니다.