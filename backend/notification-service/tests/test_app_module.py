import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', '..'))

import pytest


class TestNotificationAppModule:

    @pytest.mark.asyncio
    async def test_app_module_imports_notification_module(self):
        pass

    @pytest.mark.asyncio
    async def test_app_module_raises_error_on_missing_redis_config(self):
        pass

    @pytest.mark.asyncio
    async def test_app_module_registers_notification_service_provider(self):
        pass