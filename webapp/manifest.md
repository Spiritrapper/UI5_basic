```json
{ 
    "_version": "1.58.0",  // Manifest 파일의 버전 정보
    "sap.app": { 
        "id": "ui5.walkthrough",  // 애플리케이션의 고유 식별자
        "i18n": "i18n/i18n.properties",  // 다국어 지원을 위한 i18n 프로퍼티 파일의 경로
        "title": "{{appTitle}}",  // 애플리케이션 제목 (변수로 설정)
        "description": "{{appDescription}}",  // 애플리케이션 설명 (변수로 설정)
        "type": "application",  // 애플리케이션의 유형 (여기서는 애플리케이션)
        "applicationVersion": {
            "version": "1.0.0"  // 애플리케이션의 버전
        },
        "dataSources": {  // 데이터 소스 설정
            "invoiceRemote": {  // OData 서비스 정의
                "uri": "V2/Northwind/Northwind.svc/",  // OData 서비스의 URI
                "type": "OData",  // 데이터 소스의 유형 (OData)
                "settings": {
                    "odataVersion": "2.0"  // 사용되는 OData 버전
                }
            }
        }
    },
    "sap.ui": {  // UI5 관련 설정
        "technology": "UI5",  // 사용 기술 (UI5)
        "deviceTypes": {  // 지원하는 장치 유형
            "desktop": true,  // 데스크탑 지원 여부
            "tablet": true,  // 태블릿 지원 여부
            "phone": true  // 전화기 지원 여부
        }
    },
    "sap.ui5": {  // UI5 애플리케이션 설정
        "dependencies": {  // 의존성 설정
            "minUI5Version": "1.108.0",  // 필요한 최소 UI5 버전
            "libs": {  // 의존 라이브러리
                "sap.ui.core": {},  // 필수 라이브러리
                "sap.m": {}  // 추가 라이브러리
            }
        },
        "models": {  // 모델 정의
            "i18n": {  // i18n 모델
                "type": "sap.ui.model.resource.ResourceModel",  // 리소스 모델
                "settings": {
                    "bundleName": "ui5.walkthrough.i18n.i18n",  // i18n 번들의 이름
                    "supportedLocales": [""],  // 지원하는 로케일 (빈 배열은 모든 로케일 지원)
                    "fallbackLocale": ""  // 대체 로케일 (빈 문자열은 기본 로케일 사용)
                }
            },
            "invoice": {  // JSON 모델
                "type": "sap.ui.model.json.JSONModel",  // JSON 모델 타입
                "uri": "Invoices.json",  // 모델 데이터 파일의 경로
                "dataSource": "invoiceRemote"  // 데이터 소스 이름
            }
        },
        
        "rootView": {  // 애플리케이션의 루트 뷰 설정
            "viewName": "ui5.walkthrough.view.App",  // 루트 뷰의 이름
            "type": "XML",  // 뷰의 타입 (XML)
            "id": "app"  // 뷰의 ID
        },
        "resources": {  // 리소스 설정
            "css": [  // CSS 파일
                {
                    "uri": "css/style.css"  // CSS 파일의 경로
                }
            ]
        },
        "routing": {  // 라우팅 설정
            "config": {
                "routerClass": "sap.m.routing.Router",  // 사용될 라우터 클래스
                "type": "View",  // 라우팅 타입 (뷰)
                "viewType": "XML",  // 뷰의 타입 (XML)
                "path": "ui5.walkthrough.view",  // 뷰의 경로
                "controlId": "app",  // 제어할 컨트롤의 ID
                "controlAggregation": "pages"  // 컨트롤의 집합 (여기서는 pages)
            },
            "routes": [  // 라우트 설정
                {
                    "pattern": "",  // 기본 경로 (홈 페이지)
                    "name": "overview",  // 라우트 이름
                    "target": "overview"  // 대상 뷰
                },
                {
                    "pattern": "detail/{invoicePath}",  // 세부 경로 (상세 보기)
                    "name": "detail",  // 라우트 이름
                    "target": "detail"  // 대상 뷰
                }
            ],
            "targets": {  // 뷰의 타겟 설정
                "overview": {  // 개요 뷰
                    "id": "overview",  // 타겟 ID
                    "name": "Overview"  // 타겟 이름
                },
                "detail": {  // 상세 뷰
                    "id": "detail",  // 타겟 ID
                    "name": "Detail"  // 타겟 이름
                }
            }
        },
        "contentDensities": {  // 콘텐츠 밀도 설정
            "compact": true,  // Compact 밀도 지원 여부
            "cozy": true  // Cozy 밀도 지원 여부
        }
    } 
}
```
Manifest.json

역할: 애플리케이션의 메타데이터를 JSON 형식으로 정의하며, SAPUI5 애플리케이션의 구성 및 설정을 포함합니다.
구성 요소:
sap.app: 애플리케이션 ID, 이름, 버전, 데이터 소스 등의 기본 정보.
sap.ui5: 종속 라이브러리, 모델, 라우팅, 루트 뷰 등의 설정.
sap.ui: UI5 기술과 장치 유형에 대한 설정.


```json
주석의 의미:```
"_version": "1.58.0":

Manifest 파일의 버전 정보입니다. 이 정보는 파일의 포맷이나 UI5의 특정 기능 버전과 관련이 있을 수 있습니다.
"sap.app":

애플리케이션 관련 메타데이터를 정의합니다. 애플리케이션의 ID, 다국어 파일 경로, 제목, 설명, 타입, 버전 및 데이터 소스 설정을 포함합니다.
"sap.ui":

UI5와 관련된 설정을 정의합니다. 지원하는 장치 유형(데스크탑, 태블릿, 전화기)을 명시합니다.
"sap.ui5":

UI5 애플리케이션의 설정을 포함합니다. 이 설정에는 의존성, 모델, 루트 뷰, 리소스, 라우팅 및 콘텐츠 밀도가 포함됩니다.

"dependencies":

필수 UI5 라이브러리와 최소 버전을 정의합니다.
"models":

애플리케이션에서 사용할 모델을 정의합니다. i18n 모델과 invoice 모델이 설정되어 있습니다.
"rootView":

애플리케이션의 루트 뷰를 설정합니다. 루트 뷰는 XML 형식의 ui5.walkthrough.view.App입니다.
"resources":

애플리케이션의 추가 리소스, 예를 들어 CSS 파일을 정의합니다.
"routing":

애플리케이션의 라우팅 설정을 정의합니다. 라우팅 구성, 라우트 및 타겟을 포함합니다.
"contentDensities":

콘텐츠 밀도(Compact, Cozy) 지원 여부를 설정합니다. 이는 UI의 레이아웃과 디자인에 영향을 미칩니다.
이 manifest.json 파일은 SAPUI5 애플리케이션의 구성 정보를 정의하는 중요한 파일로, 애플리케이션의 메타데이터, 모델, 라우팅, 리소스 등을 설정합니다.

설명
"_version": "1.58.0":

Manifest 파일의 버전 정보입니다.
"sap.app":

애플리케이션의 메타데이터를 정의합니다.
"id": 애플리케이션의 고유 식별자입니다.
"i18n": 다국어 지원을 위한 리소스 번들 파일의 경로입니다.
"title": 애플리케이션의 제목입니다 (변수로 설정).
"description": 애플리케이션의 설명입니다 (변수로 설정).
"type": 애플리케이션의 유형입니다 (여기서는 application).
"applicationVersion": 애플리케이션의 버전 정보입니다.
"dataSources": 애플리케이션에서 사용할 데이터 소스를 정의합니다. 여기서는 OData 서비스의 URI와 버전을 설정합니다.
"sap.ui":

UI5와 관련된 설정을 정의합니다.
"technology": 사용된 기술 (여기서는 UI5).
"deviceTypes": 지원하는 장치 유형을 설정합니다 (데스크탑, 태블릿, 전화기).
"sap.ui5":

UI5 애플리케이션의 설정을 포함합니다.
"dependencies": 필수 UI5 라이브러리와 최소 버전을 설정합니다.
"models": 애플리케이션에서 사용할 모델을 정의합니다. i18n과 invoice 모델이 포함됩니다.
"rootView": 애플리케이션의 루트 뷰를 설정합니다. XML 형식의 ui5.walkthrough.view.App입니다.
"resources": 애플리케이션에서 사용할 리소스 파일 (예: CSS)을 정의합니다.
"routing": 라우팅 설정을 정의합니다. 라우터 클래스, 뷰 타입, 라우트 및 타겟을 설정합니다.
"contentDensities": 콘텐츠 밀도(Compact, Cozy) 지원 여부를 설정합니다.
이 JSON 파일은 SAPUI5 애플리케이션의 메타데이터, 모델, 라우팅, 리소스 등을 정의하는 중요한 파일입니다. JSON 형식으로 주석을 추가할 수 없기 때문에, JSON 파일을 올바르게 작성하고 설명을 문서화하는 방법으로 설명을 제공합니다.
```