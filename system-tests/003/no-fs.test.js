'use strict';

const core = require('../../lib/core-entrypoint');
const stylint = require('../../lib');
const { caseConfig, caseCode, prepForSnapshot } = require('../systemTestUtils');

const CASE_NUMBER = '003';

describe('no-fs - zen garden CSS with standard config', () => {
	let coreResult;
	let stylelintResult;

	beforeAll(async () => {
		const code = await caseCode(CASE_NUMBER);
		const config = await caseConfig(CASE_NUMBER);

		stylelintResult = prepForSnapshot(await stylint.lint({ code, config, fix: true }));
		coreResult = prepForSnapshot(await core.lint({ code, config, fix: true }));
	});

	it('standalone', async () => {
		expect(stylelintResult).toMatchSnapshot();
	}, 10000);

	it('standalone and core return equal results', async () => {
		expect(coreResult).toEqual(stylelintResult);
	}, 10000);
});
