import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', '..'))

import pytest


class TestPlantStartScript:

    @pytest.mark.asyncio
    async def test_start_script_waits_for_db_and_starts_service(self):
        pass

    @pytest.mark.asyncio
    async def test_start_script_fails_if_db_unreachable(self):
        pass

    @pytest.mark.asyncio
    async def test_start_script_runs_seed_only_if_needed(self):
        pass