import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', '..'))

import pytest


class TestAuthAppModule:

    @pytest.mark.asyncio
    async def test_app_module_imports_auth_and_user_modules(self):
        pass

    @pytest.mark.asyncio
    async def test_app_module_fails_on_missing_dependencies(self):
        pass

    @pytest.mark.asyncio
    async def test_app_module_registers_global_middlewares(self):
        pass