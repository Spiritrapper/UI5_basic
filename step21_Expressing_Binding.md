### 한국어 해석

### **이제 가격이 숫자에 따라 포맷됩니다**

**코딩**

Walkthrough - Step 21에서 모든 파일을 볼 수 있고 다운로드할 수 있습니다.

#### `webapp/view/InvoiceList.view.xml`

```xml
<mvc:View
    controllerName="ui5.walkthrough.controller.InvoiceList"
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc">
    <List
        headerText="{i18n>invoiceListTitle}"
        class="sapUiResponsiveMargin"
        width="auto"
        items="{invoice>/Invoices}">
        <items>
            <ObjectListItem
                title="{invoice>Quantity} x {invoice>ProductName}"
                number="{
                    parts: [
                        'invoice>ExtendedPrice',
                        'view>/currency'
                    ],
                    type: 'sap.ui.model.type.Currency',
                    formatOptions: {
                        showMeasure: false
                    }
                }"
                numberUnit="{view>/currency}"
                numberState="{= ${invoice>ExtendedPrice} > 50 ? 'Error' : 'Success' }"/>
        </items>
    </List>
</mvc:View>
```

우리는 선언적 뷰에 `numberState` 속성을 추가하고, 괄호 안에 `=`으로 시작하는 새로운 바인딩 구문을 도입했습니다. 이 기호는 새로운 바인딩 구문을 시작하는 데 사용되며, 이를 표현식(Expression)이라고 부르며, 여기서 보여주는 삼항 연산자와 같은 간단한 계산 논리를 수행할 수 있습니다.

연산자의 조건은 데이터 모델에서 가져온 값입니다. 표현식 바인딩 내에서 모델 바인딩은 `$` 기호로 이스케이프 처리해야 하며, 위 코드에서 이를 확인할 수 있습니다. 가격이 50보다 크면 상태를 "Error"로 설정하여 숫자가 빨간색으로 나타나고, 그렇지 않으면 "Success"로 설정하여 숫자가 녹색으로 나타납니다.

표현식은 데이터 포맷팅을 돕는 수학 표현식, 비교 등과 같은 특정 연산 집합에 제한됩니다. 가능한 연산에 대해서는 문서에서 확인할 수 있습니다.

**관례**
표현식 바인딩은 간단한 계산에만 사용하세요.