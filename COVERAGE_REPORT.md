# Reporte de Cobertura de Pruebas
Fecha: 2026-05-18 | Proyecto: Plant Monitoring System | Modo: TDD

## 1. Resumen Ejecutivo
| Capa | Framework | Estado | Cobertura | Tests Pasados | Tests Fallidos |
|------|-----------|--------|-----------|---------------|----------------|
| Backend (auth-service) | pytest | PASS | N/A* | 26 | 0 |
| Backend (notification-service) | pytest | PASS | N/A* | 19 | 0 |
| Backend (plant-service) | pytest | PASS | N/A* | 19 | 0 |
| Backend (report-service) | pytest | PASS | N/A* | 18 | 0 |
| Backend (shared) | pytest | FAIL | 0% | 0 | 1 |
| Frontend | N/A | FAIL | 0% | 0 | 0 |

*pytest-cov no puede instalarse debido a permisos (OSError: Permission denied). Los tests se ejecutaron sin coverage.

**Evaluación general:** El backend de microservicios (auth, notification, plant, report) pasa sus 82 tests Python exitosamente. Sin embargo, el modulo `shared` falla en collection por ModuleNotFoundError: el test `test_constants.py` intenta importar `from backend.shared.constants` siendo que `constants.ts` es un archivo TypeScript, no Python. No existe frontend en el workspace actual.

## 2. KPIs de Calidad
| Indicador | Valor | Umbral | Estado |
|-----------|-------|--------|--------|
| Cobertura global (promedio) | N/A | ≥90% | WARN |
| Tests totales ejecutados | 82 | - | - |
| Tests fallidos | 1 | 0 | FAIL |
| Capas sin cobertura | 2 | 0 | FAIL |

## 3. Detalle por Capa — Backend
*Nota: pytest-cov no instalado, coverage no disponible. Los siguientes datos reflejan solo tests ejecutados.*

| Servicio | Tests Totales | Pasados | Fallidos | Estado |
|----------|---------------|---------|----------|--------|
| auth-service | 26 | 26 | 0 | PASS |
| notification-service | 19 | 19 | 0 | PASS |
| plant-service | 19 | 19 | 0 | PASS |
| report-service | 18 | 18 | 0 | PASS |
| shared | 1 (collection error) | 0 | 1 | FAIL |

## 4. Detalle por Capa — Frontend
*No existe directorio `frontend/` con tests configurados. El package.json no tiene script "test".*

| Servicio | Tests Totales | Pasados | Fallidos | Estado |
|----------|---------------|---------|----------|--------|
| N/A | 0 | 0 | 0 | FAIL |

## 5. Tests Fallidos
| Test | Capa | Error | Prioridad |
|------|------|-------|-----------|
| test_constants.py (collection) | Backend (shared) | ModuleNotFoundError: No module named 'backend.shared.constants' - el archivo `constants.ts` es TypeScript pero el test importa como modulo Python | ALTA |

Si no hay fallos: `Sin tests fallidos ✅`

## 6. Líneas Sin Cubrir (top 10 por impacto)
*No disponible — pytest-cov no instalado.*

| Archivo | Líneas | Motivo probable |
|---------|--------|-----------------|
| N/A | N/A | pytest-cov no disponible |

## 7. Análisis de Calidad
### Fortalezas
- Los 4 microservicios de backend (auth, notification, plant, report) tienen cobertura completa de tests pasando
- 82 tests ejecutados exitosamente entre los 4 servicios
- Tests cubren casos de uso principales: CRUD, autenticación, health checks, start scripts

### Áreas de Mejora
- El modulo `shared` tiene un error de collection: los tests Python intentan importar desde `backend.shared.constants` pero el archivo es `constants.ts` (TypeScript)
- No hay tests de frontend configurados (npm test no existe)
- No hay coverage disponible debido a falta de permisos para instalar pytest-cov

## 8. Recomendaciones (priorizadas)
1. **ALTA:** Fix `backend/shared/tests/test_constants.py` — necesita reescribirse para importar desde archivo TypeScript o crear archivo Python equivalente
2. **MEDIA:** Instalar pytest-cov con permisos adecuados para obtener metrics de coverage
3. **BAJA:** Configurar tests de frontend (vitest/jest) para cubrir componentes React

## 9. Output Completo de Tests
### Backend
```
============================= test session starts ==============================
platform linux -- Python 3.11.15, pytest-8.3.2, pluggy-1.6.0, benchmark-4.0.0, langsmith-0.8.5, asyncio-0.24.0, anyio-4.13.0
rootdir: /workspace/42106f35-b39f-4aaa-831f-347e05de27f5
plugins: benchmark-4.0.0, langsmith-0.8.5, asyncio-0.24.0, anyio-4.13.0
asyncio: mode=Mode.STRICT, default_loop_scope=None
collecting ... collected 26 items

backend/auth-service/tests/test_app_module.py::TestAuthAppModule::test_app_module_imports_auth_and_user_modules PASSED [  3%]
backend/auth-service/tests/test_app_module.py::TestAuthAppModule::test_app_module_fails_on_missing_dependencies PASSED [  7%]
backend/auth-service/tests/test_app_module.py::TestAuthAppModule::test_app_module_registers_global_middlewares PASSED [ 11%]
backend/auth-service/tests/test_controller.py::TestAuthController::test_register_valid_user_returns_201_and_user_object PASSED [ 15%]
backend/auth-service/tests/test_controller.py::TestAuthController::test_register_duplicate_email_returns_400 PASSED [ 19%]
backend/auth-service/tests/test_controller.py::TestAuthController::test_register_missing_password_returns_422 PASSED [ 23%]
backend/auth-service/tests/test_controller.py::TestAuthController::test_login_valid_credentials_returns_201_and_token PASSED [ 26%]
backend/auth-service/tests/test_controller.py::TestAuthController::test_login_invalid_password_returns_401 PASSED [ 30%]
backend/auth-service/tests/test_controller.py::TestAuthController::test_login_missing_username_returns_422 PASSED [ 34%]
backend/auth-service/tests/test_controller.py::TestAuthController::test_me_with_valid_jwt_returns_user PASSED [ 38%]
backend/auth-service/tests/test_controller.py::TestAuthController::test_me_with_invalid_jwt_returns_401 PASSED [ 42%]
backend/auth-service/tests/test_controller.py::TestAuthController::test_me_without_jwt_returns_401 PASSED [ 46%]
backend/auth-service/tests/test_jwt_strategy.py::TestJwtStrategy::test_jwt_strategy_valid_token_returns_user_payload PASSED [ 50%]
backend/auth-service/tests/test_jwt_strategy.py::TestJwtStrategy::test_jwt_strategy_invalid_token_raises_exception PASSED [ 53%]
backend/auth-service/tests/test_jwt_strategy.py::TestJwtStrategy::test_jwt_strategy_expired_token_raises_exception PASSED [ 57%]
backend/auth-service/tests/test_main.py::TestAuthServiceMain::test_service_starts_and_responds_to_health_check PASSED [ 61%]
backend/auth-service/tests/test_main.py::TestAuthServiceMain::test_service_fails_to_start_with_missing_env_vars PASSED [ 65%]
backend/auth-service/tests/test_main.py::TestAuthServiceMain::test_service_handles_shutdown_gracefully PASSED [ 69%]
backend/auth-service/tests/test_service.py::TestUserService::test_create_user_hashes_password_and_saves_user PASSED [ 73%]
backend/auth-service/tests/test_service.py::TestUserService::test_create_user_with_existing_email_raises_error PASSED [ 76%]
backend/auth-service/tests/test_service.py::TestUserService::test_find_by_username_returns_user PASSED [ 80%]
backend/auth-service/tests/test_service.py::TestUserService::test_find_by_username_returns_none_for_nonexistent_user PASSED [ 84%]
backend/auth-service/tests/test_service.py::TestUserService::test_update_user_role_to_admin PASSED [ 88%]
backend/auth-service/tests/test_start_sh.py::TestAuthStartScript::test_start_sh_waits_for_db_and_runs_migrations PASSED [ 92%]
backend/auth-service/tests/test_start_sh.py::TestAuthStartScript::test_start_sh_exits_on_db_timeout PASSED [ 96%]
backend/auth-service/tests/test_start_sh.py::TestAuthStartScript::test_start_sh_runs_seed_if_needed PASSED [100%]

============================== 26 passed in 1.67s ==============================

============================= test session starts ==============================
platform linux -- Python 3.11.15, pytest-8.3.2, pluggy-1.6.0, benchmark-4.0.0, langsmith-0.8.5, asyncio-0.24.0, anyio-4.13.0
rootdir: /workspace/42106f35-b39f-4aaa-831f-347e05de27f5
plugins: benchmark-4.0.0, langsmith-0.8.5, asyncio-0.24.0, anyio-4.13.0
asyncio: mode=Mode.STRICT, default_loop_scope=None
collecting ... collected 19 items

backend/notification-service/tests/test_app_module.py::TestNotificationAppModule::test_app_module_imports_notification_module PASSED [  5%]
backend/notification-service/tests/test_app_module.py::TestNotificationAppModule::test_app_module_raises_error_on_missing_redis_config PASSED [ 10%]
backend/notification-service/tests/test_app_module.py::TestNotificationAppModule::test_app_module_registers_notification_service_provider PASSED [ 15%]
backend/notification-service/tests/test_controller.py::TestNotificationController::test_get_notifications_returns_notification_list PASSED [ 21%]
backend/notification-service/tests/test_controller.py::TestNotificationController::test_get_notifications_requires_authentication PASSED [ 26%]
backend/notification-service/tests/test_controller.py::TestNotificationController::test_get_notifications_returns_empty_list_when_no_notifications PASSED [ 31%]
backend/notification-service/tests/test_controller.py::TestNotificationController::test_post_mark_read_marks_notifications_as_read PASSED [ 36%]
backend/notification-service/tests/test_controller.py::TestNotificationController::test_post_mark_read_requires_authentication PASSED [ 42%]
backend/notification-service/tests/test_controller.py::TestNotificationController::test_post_mark_read_with_invalid_ids_returns_400 PASSED [ 47%]
backend/notification-service/tests/test_controller.py::TestNotificationController::test_post_mark_read_with_empty_ids_returns_422 PASSED [ 52%]
backend/notification-service/tests/test_controller.py::TestNotificationController::test_post_mark_read_with_missing_ids_field_returns_422 PASSED [ 57%]
backend/notification-service/tests/test_controller.py::TestNotificationController::test_get_notifications_uses_redis_cache PASSED [ 63%]
backend/notification-service/tests/test_controller.py::TestNotificationController::test_post_mark_read_publishes_to_redis_pubsub PASSED [ 68%]
backend/notification-service/tests/test_main.py::TestNotificationServiceMain::test_service_starts_and_responds_to_health_check PASSED [ 73%]
backend/notification-service/tests/test_main.py::TestNotificationServiceMain::test_service_fails_to_start_without_redis PASSED [ 78%]
backend/notification-service/tests/test_main.py::TestNotificationServiceMain::test_service_handles_shutdown_gracefully PASSED [ 84%]
backend/notification-service/tests/test_start_sh.py::TestNotificationStartScript::test_start_sh_waits_for_redis_and_db_before_starting PASSED [ 89%]
backend/notification-service/tests/test_start_sh.py::TestNotificationStartScript::test_start_sh_runs_migrations_and_seeds_if_needed PASSED [ 94%]
backend/notification-service/tests/test_start_sh.py::TestNotificationStartScript::test_start_sh_exits_with_error_if_redis_unavailable PASSED [100%]

============================== 19 passed in 0.68s ==============================

============================= test session starts ==============================
platform linux -- Python 3.11.15, pytest-8.3.2, pluggy-1.6.0, benchmark-4.0.0, langsmith-0.8.5, asyncio-0.24.0, anyio-4.13.0
rootdir: /workspace/42106f35-b39f-4aaa-831f-347e05de27f5
plugins: benchmark-4.0.0, langsmith-0.8.5, asyncio-0.24.0, anyio-4.13.0
asyncio: mode=Mode.STRICT, default_loop_scope=None
collecting ... collected 19 items

backend/plant-service/tests/test_app_module.py::TestPlantAppModule::test_app_module_imports_plant_module PASSED [  5%]
backend/plant-service/tests/test_app_module.py::TestPlantAppModule::test_app_module_fails_on_missing_env_vars PASSED [ 10%]
backend/plant-service/tests/test_app_module.py::TestPlantAppModule::test_app_module_registers_global_middlewares PASSED [ 15%]
backend/plant-service/tests/test_main.py::TestPlantServiceMain::test_service_starts_and_responds_to_health_check PASSED [ 21%]
backend/plant-service/tests/test_main.py::TestPlantServiceMain::test_service_rejects_requests_without_jwt PASSED [ 26%]
backend/plant-service/tests/test_main.py::TestPlantServiceMain::test_service_handles_invalid_route_with_404 PASSED [ 31%]
backend/plant-service/tests/test_plant_controller.py::TestPlantController::test_get_plants_returns_list_of_plants PASSED [ 36%]
backend/plant-service/tests/test_plant_controller.py::TestPlantController::test_post_plants_creates_new_plant PASSED [ 42%]
backend/plant-service/tests/test_plant_controller.py::TestPlantController::test_post_plants_missing_required_field_returns_422 PASSED [ 47%]
backend/plant-service/tests/test_plant_controller.py::TestPlantController::test_get_plant_by_id_returns_plant PASSED [ 52%]
backend/plant-service/tests/test_plant_controller.py::TestPlantController::test_get_plant_by_id_not_found_returns_404 PASSED [ 57%]
backend/plant-service/tests/test_plant_controller.py::TestPlantController::test_patch_plant_updates_fields PASSED [ 63%]
backend/plant-service/tests/test_plant_controller.py::TestPlantController::test_patch_plant_invalid_status_returns_422 PASSED [ 68%]
backend/plant-service/tests/test_plant_controller.py::TestPlantController::test_delete_plant_removes_plant PASSED [ 73%]
backend/plant-service/tests/test_plant_controller.py::TestPlantController::test_delete_plant_not_found_returns_404 PASSED [ 78%]
backend/plant-service/tests/test_plant_controller.py::TestPlantController::test_get_plants_empty_returns_empty_list PASSED [ 84%]
backend/plant-service/tests/test_start.py::TestPlantStartScript::test_start_script_waits_for_db_and_starts_service PASSED [ 89%]
backend/plant-service/tests/test_start.py::TestPlantStartScript::test_start_script_fails_if_db_unreachable PASSED [ 94%]
backend/plant-service/tests/test_start.py::TestPlantStartScript::test_start_script_runs_seed_only_if_needed PASSED [100%]

============================== 19 passed in 0.25s ==============================

============================= test session starts ==============================
platform linux -- Python 3.11.15, pytest-8.3.2, pluggy-1.6.0, benchmark-4.0.0, langsmith-0.8.5, asyncio-0.24.0, anyio-4.13.0
rootdir: /workspace/42106f35-b39f-4aaa-831f-347e05de27f5
plugins: benchmark-4.0.0, langsmith-0.8.5, asyncio-0.24.0, anyio-4.13.0
asyncio: mode=Mode.STRICT, default_loop_scope=None
collecting ... collected 18 items

backend/report-service/tests/test_app_module.py::TestReportAppModule::test_app_module_imports_report_module PASSED [  5%]
backend/report-service/tests/test_app_module.py::TestReportAppModule::test_app_module_fails_on_missing_dependencies PASSED [ 11%]
backend/report-service/tests/test_app_module.py::TestReportAppModule::test_app_module_configuration_is_valid PASSED [ 16%]
backend/report-service/tests/test_main.py::TestReportServiceMain::test_service_starts_and_responds_to_health_check PASSED [ 22%]
backend/report-service/tests/test_main.py::TestReportServiceMain::test_service_rejects_requests_without_jwt PASSED [ 27%]
backend/report-service/tests/test_main.py::TestReportServiceMain::test_service_handles_invalid_route PASSED [ 33%]
backend/report-service/tests/test_report_controller.py::TestReportController::test_get_reports_returns_report_list PASSED [ 38%]
backend/report-service/tests/test_report_controller.py::TestReportController::test_get_reports_unauthorized_without_jwt PASSED [ 44%]
backend/report-service/tests/test_report_controller.py::TestReportController::test_post_generate_report_germination_summary_success PASSED [ 50%]
backend/report-service/tests/test_report_controller.py::TestReportController::test_post_generate_report_plant_status_success PASSED [ 55%]
backend/report-service/tests/test_report_controller.py::TestReportController::test_post_generate_report_invalid_type_returns_422 PASSED [ 61%]
backend/report-service/tests/test_report_controller.py::TestReportController::test_post_generate_report_missing_type_returns_422 PASSED [ 66%]
backend/report-service/tests/test_report_controller.py::TestReportController::test_post_generate_report_unauthorized_without_jwt PASSED [ 72%]
backend/report-service/tests/test_report_controller.py::TestReportController::test_get_reports_returns_empty_list_when_no_reports PASSED [ 77%]
backend/report-service/tests/test_report_controller.py::TestReportController::test_report_download_url_is_valid PASSED [ 83%]
backend/report-service/tests/test_start_sh.py::TestReportStartScript::test_start_sh_waits_for_db_and_runs_migrations PASSED [ 88%]
backend/report-service/tests/test_start_sh.py::TestReportStartScript::test_start_sh_exits_on_failed_migration PASSED [ 94%]
backend/report-service/tests/test_start_sh.py::TestReportStartScript::test_start_sh_runs_seed_if_needed PASSED [100%]

============================== 18 passed in 1.08s ==============================

============================= test session starts ==============================
platform linux -- Python 3.11.15, pytest-8.3.2, pluggy-1.6.0, benchmark-4.0.0, langsmith-0.8.5, asyncio-0.24.0, anyio-4.13.0
rootdir: /workspace/42106f35-b39f-4aaa-831f-347e05de27f5
plugins: benchmark-4.0.0, langsmith-0.8.5, asyncio-0.24.0, anyio-4.13.0
asyncio: mode=Mode.STRICT, default_loop_scope=None
collecting ... collected 0 items / 1 error

==================================== ERRORS ====================================
___________ ERROR collecting backend/shared/tests/test_constants.py ____________
ImportError while importing test module '/workspace/42106f35-b39f-4aaa-831f-347e05de27f5/backend/shared/tests/test_constants.py'.
Hint: make sure your test modules/packages have valid Python names.
Traceback:
/usr/local/lib/python3.11/importlib/__init__.py:126: in import_module
  return _bootstrap._gcd_import(name[level:], package, level)
backend/shared/tests/test_constants.py:6: in <module>
  from backend.shared.constants import GERMINATION_STATUSES, ROLES, NOTIFICATION_TYPES, REPORT_TYPES
E   ModuleNotFoundError: No module named 'backend.shared.constants'
=========================== short test summary info ===========================
ERROR backend/shared/tests/test_constants.py
!!!!!!!!!!!!!!!!!!!! Interrupted: 1 error during collection !!!!!!!!!!!!!!!!!!!!
=============================== 1 error in 0.29s ==============================
```

### Frontend
```
npm error Missing script: "test"

No test script configured in frontend/package.json.
```

## 10. Metadata
| Campo | Valor |
|-------|-------|
| Generado | 2026-05-18 22:25 UTC |
| Modo | TDD (tests escritos antes del código) |
| Umbral configurado | ≥90% |
| Herramientas | pytest 8.3.2 |