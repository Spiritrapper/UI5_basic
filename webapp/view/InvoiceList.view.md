```javascript
<mvc:View
    controllerName="ui5.walkthrough.controller.InvoiceList"  <!-- 이 뷰와 연결된 컨트롤러의 이름을 지정 -->
	xmlns="sap.m"  <!-- SAPUI5 모바일 라이브러리의 XML 네임스페이스 선언 -->
	xm
    lns:mvc="sap.ui.core.mvc">  <!-- MVC 패턴의 XML 네임스페이스 선언 -->

	<Table
		id="invoiceList"  <!-- 테이블 컨트롤의 ID를 "invoiceList"로 설정 -->
		class="sapUiResponsiveMargin"  <!-- CSS 클래스 "sapUiResponsiveMargin"을 적용하여 반응형 마진을 설정 -->
		width="auto"  <!-- 테이블의 너비를 자동으로 설정 -->
		items="{  <!-- 테이블의 항목들을 바인딩할 경로와 정렬기를 설정 -->
				path : 'invoice>/Invoices',  <!-- "invoice" 모델의 "Invoices" 경로를 바인딩 경로로 설정 -->
				sorter : {  <!-- 테이블 항목을 정렬하는 정렬기 설정 -->
					path : 'ShipperName',  <!-- "ShipperName" 필드를 기준으로 정렬 -->
					group : true  <!-- 이 정렬기를 사용하여 항목을 그룹화함 -->
				}
			}">
			
		<headerToolbar>  <!-- 테이블의 헤더 툴바를 정의 -->
			<Toolbar>  <!-- 헤더 툴바 생성 -->
				<Title text="{i18n>invoiceListTitle}" />  <!-- 툴바 내에 타이틀을 설정, i18n 모델의 "invoiceListTitle" 키 사용 -->
				<ToolbarSpacer />  <!-- 툴바 내의 타이틀과 검색 필드 사이에 빈 공간을 추가 -->
				<SearchField
					width="50%"  <!-- 검색 필드의 너비를 50%로 설정 -->
					search=".onFilterInvoices"/>  <!-- 검색 이벤트가 발생할 때 호출될 메서드 지정 (컨트롤러의 onFilterInvoices 메서드) -->
			</Toolbar>
		</headerToolbar>

		<columns>  <!-- 테이블의 열(컬럼)들을 정의 -->
			<Column
				hAlign="End"  <!-- 열의 텍스트 정렬을 오른쪽(End)으로 설정 -->
				minScreenWidth="Small"  <!-- 최소 화면 너비가 "Small"일 때 이 열을 표시 -->
				demandPopin="true"  <!-- 화면이 작을 때 이 열을 팝인(Popin)으로 변환 -->
				width="5em">  <!-- 이 열의 너비를 5em으로 설정 -->
				<Text text="{i18n>columnQuantity}" />  <!-- 열 헤더 텍스트 설정, i18n 모델의 "columnQuantity" 키 사용 -->
			</Column>
			<Column>
				<Text text="{i18n>columnName}" />  <!-- 열 헤더 텍스트 설정, i18n 모델의 "columnName" 키 사용 -->
			</Column>
			<Column
				minScreenWidth="Small"  <!-- 최소 화면 너비가 "Small"일 때 이 열을 표시 -->
				demandPopin="true">  <!-- 화면이 작을 때 이 열을 팝인(Popin)으로 변환 -->
				<Text text="{i18n>columnStatus}" />  <!-- 열 헤더 텍스트 설정, i18n 모델의 "columnStatus" 키 사용 -->
			</Column>
			<Column
				minScreenWidth="Tablet"  <!-- 최소 화면 너비가 "Tablet"일 때 이 열을 표시 -->
				demandPopin="false">  <!-- 이 열은 팝인(Popin)으로 변환되지 않음 -->
				<Text text="{i18n>columnSupplier}" />  <!-- 열 헤더 텍스트 설정, i18n 모델의 "columnSupplier" 키 사용 -->
			</Column>
			<Column hAlign="End">  <!-- 열의 텍스트 정렬을 오른쪽(End)으로 설정 -->
				<Text text="{i18n>columnPrice}" />  <!-- 열 헤더 텍스트 설정, i18n 모델의 "columnPrice" 키 사용 -->
			</Column>
		</columns>

		<items>  <!-- 테이블의 각 항목들을 정의 -->
			<ColumnListItem
				type="Navigation"  <!-- 항목의 유형을 "Navigation"으로 설정하여 탐색 가능하게 설정 -->
				press=".onPress">  <!-- 항목을 클릭할 때 호출될 메서드 지정 (컨트롤러의 onPress 메서드) -->
				<cells>  <!-- 각 항목 내의 셀(데이터 필드)들을 정의 -->
					<ObjectNumber
						number="{invoice>Quantity}"  <!-- "Quantity" 데이터를 표시 -->
						emphasized="false"/>  <!-- 숫자 강조를 비활성화 -->
					<ObjectIdentifier title="{invoice>ProductName}" />  <!-- "ProductName" 데이터를 제목으로 표시 -->
					<Text
						text="{  <!-- 상태 텍스트를 형식화하여 표시 -->
								parts: [
									'invoice>Status',  <!-- "Status" 필드를 바인딩 -->
									'i18n>invoiceStatusA',  <!-- "invoiceStatusA" 텍스트를 바인딩 -->
									'i18n>invoiceStatusB',  <!-- "invoiceStatusB" 텍스트를 바인딩 -->
									'i18n>invoiceStatusC'   <!-- "invoiceStatusC" 텍스트를 바인딩 -->
								],
								formatter: '.formatter.statusText'  <!-- 컨트롤러의 "formatter.statusText" 메서드를 사용하여 상태 텍스트 형식화 -->
							}"/>
					<Text text="{invoice>ShipperName}" />  <!-- "ShipperName" 데이터를 텍스트로 표시 -->
					<ObjectNumber
						number="{  <!-- 가격을 통화 형식으로 표시 -->
								parts: [
									'invoice>ExtendedPrice',  <!-- "ExtendedPrice" 필드를 바인딩 -->
									'view>/currency'  <!-- "currency" 필드를 바인딩 -->
								],
								type: 'sap.ui.model.type.Currency',  <!-- 통화 타입으로 형식화 -->
								formatOptions: {
									showMeasure: false  <!-- 통화 단위를 표시하지 않도록 설정 -->
								}
							}"
						unit="{view>/currency}"  <!-- 통화 단위를 설정, "currency" 데이터 경로에서 가져옴 -->
						state="{= ${invoice>ExtendedPrice} > 50 ? 'Error' : 'Success' }"/>  <!-- "ExtendedPrice"가 50보다 크면 'Error', 아니면 'Success'로 상태를 설정 -->
				</cells>
			</ColumnListItem>
		</items>
	</Table>
</mvc:View>
```