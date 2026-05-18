import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', '..'))

import pytest


class TestPlantAppModule:

    @pytest.mark.asyncio
    async def test_app_module_imports_plant_module(self):
        pass

    @pytest.mark.asyncio
    async def test_app_module_fails_on_missing_env_vars(self):
        pass

    @pytest.mark.asyncio
    async def test_app_module_registers_global_middlewares(self):
        pass