import { inspectable } from 'inspectable';

import { CollectStream, ICollectStreamOptions } from './stream';
import { LIMITS_METHODS } from './limits';

import { API } from '../api';
import { Chain } from './chain';

export interface ICollectStreamGroup {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: <T = Record<string, any>>(options: ICollectStreamOptions['options']) => CollectStream<T>;
}

export interface ICollectOptions {
	api: API;
}

export class Collect {
	public account!: ICollectStreamGroup;

	public ads!: ICollectStreamGroup;

	public apps!: ICollectStreamGroup;

	public audio!: ICollectStreamGroup;

	public board!: ICollectStreamGroup;

	public database!: ICollectStreamGroup;

	public docs!: ICollectStreamGroup;

	public fave!: ICollectStreamGroup;

	public friends!: ICollectStreamGroup;

	public gifts!: ICollectStreamGroup;

	public groups!: ICollectStreamGroup;

	public leads!: ICollectStreamGroup;

	public likes!: ICollectStreamGroup;

	public market!: ICollectStreamGroup;

	public messages!: ICollectStreamGroup;

	public notes!: ICollectStreamGroup;

	public orders!: ICollectStreamGroup;

	public photos!: ICollectStreamGroup;

	public places!: ICollectStreamGroup;

	public polls!: ICollectStreamGroup;

	public storage!: ICollectStreamGroup;

	public users!: ICollectStreamGroup;

	public utils!: ICollectStreamGroup;

	public video!: ICollectStreamGroup;

	public wall!: ICollectStreamGroup;

	public widgets!: ICollectStreamGroup;

	private api: API;

	/**
	 * constructor
	 */
	public constructor({ api }: ICollectOptions) {
		this.api = api;

		for (const [method, limit, max] of LIMITS_METHODS) {
			const [group, name] = method.split('.');

			if (this[group as keyof this] === undefined) {
				// @ts-expect-error
				this[group] = {} as ICollectStreamGroup;
			}

			// @ts-expect-error
			this[group][name] = (options = {}): CollectStream => (
				new CollectStream({
					api,
					options,
					method,
					limit,
					max
				})
			);
		}
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}
}

inspectable(Collect);
