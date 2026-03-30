# K8S_prac
Kubernetes + CI/CD + 모니터링 실습 프로젝트.
로컬 환경에서 K8s 클러스터를 구성하고 GitHub Actions + ArgoCD로 CI/CD 파이프라인을 구축했다.
Prometheus + Grafana + Loki로 모니터링 스택까지 연결했다.

---

## 기술 스택

| 분류 | 기술 |
|--|--|
| Container | Docker |
| Orchestration | Kubernetes (kind) |
| CI | GitHub Actions |
| CD | ArgoCD |
| Registry | Docker Hub |
| 메트릭 수집 | Prometheus + prom-client |
| 로그 수집 | Loki + Promtail |
| 시각화 | Grafana |
| 패키지 관리 | Helm |

---

## 실습 내용

**K8s 기본 리소스**
- Deployment / Service / Ingress / ConfigMap / Secret / Volume / HPA 실습
- 리소스 requests / limits 설정 및 OOMKilled 개념 이해
- Pod 자가치유 및 롤링 업데이트 확인

**CI/CD 파이프라인**
- GitHub Actions로 이미지 빌드 + Docker Hub push 자동화
- 커밋 ID 태그로 ArgoCD 변경 감지
- [skip ci]로 무한루프 방지
- ArgoCD GitOps 기반 자동 배포

**모니터링**
- Helm으로 Prometheus + Grafana + Loki 스택 설치
- prom-client로 /metrics 엔드포인트 구현
- http_requests_total 커스텀 메트릭 수집
- Loki로 실시간 로그 수집 및 검색
- HPA 부하테스트로 자동 스케일링 + Grafana 그래프 확인

---

## 배포 흐름
```
코드 수정 → git push
    ↓
GitHub Actions: 이미지 빌드 + Docker Hub push + yaml 이미지 태그 업데이트
    ↓
ArgoCD: k8s/ 폴더 변경 감지 → K8s 자동 배포
    ↓
Prometheus: /metrics 긁어서 데이터 수집
    ↓
Grafana: 실시간 대시보드 시각화
```

---

## 모니터링 구조
```
Pod /metrics  →  Prometheus (15초마다 수집)  →  Grafana 대시보드
Pod 로그      →  Promtail  →  Loki           →  Grafana Explore
```

---

## 주요 설정

| 항목 | 값 |
|--|--|
| HPA | CPU 50% 기준 min 1 / max 5 |
| CPU requests / limits | 100m / 500m |
| Memory requests / limits | 128Mi / 256Mi |
| 커스텀 메트릭 | http_requests_total |
| Secret 관리 | git 제외, kubectl create secret으로 직접 생성 |
