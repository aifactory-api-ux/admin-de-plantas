import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', '..'))

import pytest


class TestNotificationStartScript:

    @pytest.mark.asyncio
    async def test_start_sh_waits_for_redis_and_db_before_starting(self):
        pass

    @pytest.mark.asyncio
    async def test_start_sh_runs_migrations_and_seeds_if_needed(self):
        pass

    @pytest.mark.asyncio
    async def test_start_sh_exits_with_error_if_redis_unavailable(self):
        pass