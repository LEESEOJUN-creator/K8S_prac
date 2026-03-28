# K8S_prac

Kubernetes 실습 프로젝트. 로컬 환경에서 K8s 클러스터를 구성하고 GitHub Actions + ArgoCD로 CI/CD 파이프라인을 구축했다.

---

## 기술 스택

| | |
|--|--|
| Container | Docker |
| Orchestration | Kubernetes (kind) |
| CI | GitHub Actions |
| CD | ArgoCD |
| Registry | Docker Hub |

---

## 실습 내용

- Docker 이미지 빌드 및 Docker Hub push
- kind로 로컬 K8s 클러스터 구성
- Deployment / Service / Ingress / ConfigMap / Secret / Volume / HPA 실습
- GitHub Actions CI 파이프라인 구성
- ArgoCD CD 파이프라인 구성
- HPA 부하 테스트로 자동 스케일링 확인

---

## 배포 흐름

```
코드 수정 → git push
    ↓
GitHub Actions: 이미지 빌드 + Docker Hub push + yaml 업데이트
    ↓
ArgoCD: 변경 감지 → K8s 자동 배포
```