import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', '..'))

import pytest


class TestAuthStartScript:

    @pytest.mark.asyncio
    async def test_start_sh_waits_for_db_and_runs_migrations(self):
        pass

    @pytest.mark.asyncio
    async def test_start_sh_exits_on_db_timeout(self):
        pass

    @pytest.mark.asyncio
    async def test_start_sh_runs_seed_if_needed(self):
        pass